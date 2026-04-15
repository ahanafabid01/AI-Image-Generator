// Vercel Serverless Function to proxy OpenRouter requests and return an image response
// This keeps your API key secure on the server side

const DEFAULT_OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1';
const DEFAULT_OPENROUTER_MODEL = 'qwen/qwen3.6-plus:free';
const DEFAULT_APP_NAME = 'AI-Image-generator';
const DEFAULT_APP_URL = 'https://localhost';

function buildStyleHint(model) {
    const styleHints = {
        flux: 'photorealistic, cinematic lighting, ultra-detailed, high contrast',
        'flux-realism': 'photorealistic, realistic textures, natural lighting, sharp detail',
        'flux-anime': 'anime illustration, clean line work, vibrant color palette, expressive composition',
        'flux-3d': '3D render, sculpted forms, studio lighting, polished surfaces',
        turbo: 'fast concept art, clean composition, strong visual clarity',
    };

    return styleHints[model] || 'high-quality digital art, strong composition, detailed scene';
}

async function readErrorMessage(response) {
    const contentType = response.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
        const data = await response.json();
        return data.error || data.message || `API Error: ${response.status}`;
    }

    try {
        return await response.text();
    } catch {
        return `API Error: ${response.status}`;
    }
}

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Handle OPTIONS request for CORS preflight
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { prompt, model } = req.body;

        // Validate input
        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        const apiKey = process.env.OPENAI_API_KEY || process.env.OPENROUTER_API_KEY;
        const baseUrl = (process.env.OPENAI_BASE_URL || DEFAULT_OPENROUTER_BASE_URL).replace(/\/$/, '');
        const openRouterModel = process.env.OPENAI_MODEL || DEFAULT_OPENROUTER_MODEL;
        const appName = process.env.OPENROUTER_APP_NAME || DEFAULT_APP_NAME;
        const appUrl = process.env.OPENROUTER_APP_URL || DEFAULT_APP_URL;

        if (!apiKey) {
            console.error('OPENAI_API_KEY not found in environment variables');
            return res.status(500).json({ error: 'Server configuration error: API key not set' });
        }

        const selectedModel = model || 'flux';
        const styleHint = buildStyleHint(selectedModel);

        console.log(`Generating image with OpenRouter model: ${openRouterModel}`);

        const promptResponse = await fetch(`${baseUrl}/chat/completions`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': appUrl,
                'X-OpenRouter-Title': appName,
            },
            body: JSON.stringify({
                model: openRouterModel,
                messages: [
                    {
                        role: 'system',
                        content: 'You rewrite user ideas into a single, vivid text-to-image prompt. Return only the prompt, with no quotes, markdown, labels, or extra commentary.',
                    },
                    {
                        role: 'user',
                        content: `Write a detailed image prompt for: ${prompt}\nStyle direction: ${styleHint}`,
                    },
                ],
                temperature: 0.8,
                max_tokens: 200,
            }),
        });

        let imagePrompt = prompt;

        if (promptResponse.ok) {
            const promptData = await promptResponse.json();
            const refinedPrompt = promptData?.choices?.[0]?.message?.content?.trim();

            if (refinedPrompt) {
                imagePrompt = refinedPrompt;
            }
        } else {
            const errorMessage = await readErrorMessage(promptResponse);
            console.error('OpenRouter prompt generation error:', errorMessage);
        }

        const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(imagePrompt)}?model=${encodeURIComponent(selectedModel)}&width=1024&height=1024&nologo=true&seed=${Date.now()}`;

        const response = await fetch(imageUrl, {
            method: 'GET',
            headers: {
                'Accept': 'image/png,image/*;q=0.9,*/*;q=0.8',
            },
            cache: 'no-store',
        });

        // Handle API errors
        if (!response.ok) {
            const errorMessage = await readErrorMessage(response);
            console.error('Image generation error:', errorMessage);
            return res.status(response.status).json({ error: errorMessage || 'Image generation failed' });
        }

        // Get the image blob
        const imageBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(imageBuffer);

        // Return the image with proper headers
        res.setHeader('Content-Type', 'image/png');
        res.setHeader('Content-Length', buffer.length);
        res.status(200).send(buffer);

    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ 
            error: error.message || 'Internal server error' 
        });
    }
}
