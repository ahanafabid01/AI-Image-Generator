// Vercel Serverless Function to proxy Hugging Face API requests
// This keeps your API key secure on the server side

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
        const { prompt, model, steps } = req.body;

        // Validate input
        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        // Get API token from environment variable
        const API_TOKEN = process.env.HUGGINGFACE_API_TOKEN;

        if (!API_TOKEN) {
            console.error('HUGGINGFACE_API_TOKEN not found in environment variables');
            return res.status(500).json({ error: 'Server configuration error: API token not set' });
        }

        // Default values
        const selectedModel = model || 'black-forest-labs/FLUX.1-schnell';
        const inferenceSteps = steps || 50;

        console.log(`Generating image with model: ${selectedModel}`);

        // Call Hugging Face API
        const response = await fetch(
            `https://api-inference.huggingface.co/models/${selectedModel}`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${API_TOKEN}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    inputs: prompt,
                    parameters: {
                        num_inference_steps: inferenceSteps,
                    }
                })
            }
        );

        // Handle API errors
        if (!response.ok) {
            const contentType = response.headers.get('content-type');
            let errorMessage = `API Error: ${response.status}`;

            if (contentType && contentType.includes('application/json')) {
                const errorData = await response.json();
                errorMessage = errorData.error || errorMessage;
            }

            console.error('Hugging Face API Error:', errorMessage);

            if (response.status === 503) {
                return res.status(503).json({ 
                    error: 'Model is loading. Please wait 20-30 seconds and try again.' 
                });
            } else if (response.status === 401) {
                return res.status(401).json({ 
                    error: 'API authentication failed. Please check your API key.' 
                });
            } else {
                return res.status(response.status).json({ error: errorMessage });
            }
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
