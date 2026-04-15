# 🎨 AI Image Generator

A beautiful AI-powered image generator built with HTML, CSS, and JavaScript. This application uses OpenRouter to refine prompts before creating stunning images from text descriptions.

![AI Image Generator](https://img.shields.io/badge/AI-Image%20Generator-blue)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- 🎨 Generate stunning images from text prompts
- 🤖 Multiple visual styles to choose from (FLUX-inspired, Stable Diffusion-inspired)
- ⚡ Fast and responsive interface
- 📥 Download generated images
- 🔒 Secure API key management with serverless functions
- 💫 Beautiful UI with smooth animations

## 🚀 Live Demo

**[✨ Try it now: https://ai-image-generator-nexaurro.vercel.app](https://ai-image-generator-nexaurro.vercel.app)**

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Vercel Serverless Functions (Node.js)
- **AI API**: OpenRouter OpenAI-compatible API
- **Hosting**: Vercel

## 📋 Prerequisites

Before you begin, ensure you have:

- A [GitHub](https://github.com) account
- A [Vercel](https://vercel.com) account (free tier works great)
- An [OpenRouter](https://openrouter.ai) account and API key

## 🔑 Getting Your OpenRouter API Key

1. Go to [OpenRouter](https://openrouter.ai) and create an account if needed.
2. Open your account API settings and create an API key.
3. Copy the key for deployment.

## 📦 Deployment Steps

### Step 1: Push to GitHub

1. **Initialize Git repository** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit: AI Image Generator"
   ```

2. **Create a new repository on GitHub**:
   - Go to [GitHub](https://github.com/new)
   - Create a new repository (e.g., "ai-image-generator")
   - Don't initialize with README (we already have files)

3. **Push your code**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/ai-image-generator.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy to Vercel

1. **Go to [Vercel](https://vercel.com) and sign in**
   - You can sign in with your GitHub account

2. **Import your GitHub repository**:
   - Click **"Add New..."** → **"Project"**
   - Select **"Import Git Repository"**
   - Find and select your `ai-image-generator` repository
   - Click **"Import"**

3. **Configure Environment Variables**:
   - Before clicking "Deploy", scroll down to **Environment Variables**
    - Add the following variables:
       - **Name**: `OPENAI_API_KEY`
       - **Value**: [Your OpenRouter API key]
       - **Name**: `OPENAI_MODEL`
       - **Value**: `qwen/qwen3.6-plus:free`
       - **Name**: `OPENAI_BASE_URL`
       - **Value**: `https://openrouter.ai/api/v1`
       - **Name**: `OPENROUTER_APP_NAME`
       - **Value**: `AI-Image-generator`
       - **Name**: `OPENROUTER_APP_URL`
       - **Value**: `https://localhost`
   - Click **"Add"**

4. **Deploy**:
   - Click **"Deploy"**
   - Wait for the deployment to complete (usually 1-2 minutes)
   - Your site will be live at: `https://your-project-name.vercel.app`

### Step 3: Test Your Application

1. Visit your deployed URL
2. Enter a prompt (e.g., "A magical forest with glowing mushrooms")
3. Click "Generate Image"
4. Wait 30-60 seconds for the AI to create your image
5. Download and enjoy!

## 🔧 Local Development

To run this project locally with the serverless function:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/ai-image-generator.git
   cd ai-image-generator
   ```

2. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

3. **Create a `.env` file** in the root directory:
   ```env
   OPENAI_API_KEY=your_openrouter_key_here
   OPENAI_MODEL=qwen/qwen3.6-plus:free
   OPENAI_BASE_URL=https://openrouter.ai/api/v1
   OPENROUTER_APP_NAME=AI-Image-generator
   OPENROUTER_APP_URL=https://localhost
   ```

4. **Run the development server**:
   ```bash
   vercel dev
   ```

5. **Open your browser** to `http://localhost:3000`

## 📁 Project Structure

```
ai-image-generator/
├── api/
│   └── generate.js          # Serverless function (API proxy)
├── index.html               # Main HTML file
├── styles.css               # Styling
├── vercel.json              # Vercel configuration
├── .gitignore               # Git ignore file
└── README.md                # This file
```

## 🔐 How It Works (Security)

1. **Your frontend** (index.html) sends a request to `/api/generate`
2. **Vercel serverless function** receives the request
3. The function uses the **API key from environment variables** (secure)
4. It calls the **OpenRouter API** on your behalf to refine the prompt before generating the image
5. The image is returned to the frontend
6. **Your API key is never exposed** in the browser or GitHub

## 🎨 Customization

### Change AI Models

Edit the `<select id="model">` options in `index.html`:

```html
<option value="your-model-name">Your Model Name</option>
```

### Modify Styling

Edit `styles.css` to customize colors, fonts, and layout.

### Add More Features

You can extend the `api/generate.js` file to add:
- Image size options
- Negative prompts
- Style presets
- Rate limiting
- Image history

## 🐛 Troubleshooting

### "Server configuration error: API key not set"
- Make sure you added the `OPENAI_API_KEY` environment variable in Vercel
- Redeploy your project after adding the variable

### Image generation fails after prompt enhancement
- Check that your OpenRouter API key is valid
- Verify the `OPENAI_BASE_URL` and `OPENAI_MODEL` variables are set correctly

### Images not generating
- Check the browser console for errors
- Verify your API key is valid
- Try a different AI model

## 🌟 Available AI Models

- **FLUX.1-schnell**: Fast generation, good quality
- **FLUX.1-dev**: Slower but higher quality
- **Stable Diffusion XL**: High-resolution images
- **Stable Diffusion 1.5**: Classic model, reliable

## 📝 Example Prompts

- "A futuristic city at night with neon lights and flying cars"
- "A magical forest with glowing mushrooms and fairy lights"
- "A steampunk robot playing chess in a Victorian library"
- "An underwater palace made of coral and pearls"
- "A cyberpunk samurai in a neon-lit Tokyo street"

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**AHANAF ABID SAZID**

## 🙏 Acknowledgments

- [OpenRouter](https://openrouter.ai) for prompt generation
- [Vercel](https://vercel.com) for free hosting and serverless functions
- The open-source community for inspiration

## 🔗 Useful Links

- [OpenRouter Models](https://openrouter.ai/models)
- [Vercel Documentation](https://vercel.com/docs)
- [OpenRouter API Docs](https://openrouter.ai/docs)

---

**Made by AHANAF ABID SAZID**

If you found this project helpful, please give it a ⭐ on GitHub!
