# 🎨 AI Image Generator

A beautiful AI-powered image generator built with HTML, CSS, and JavaScript. This application uses Hugging Face's powerful AI models to create stunning images from text descriptions.

![AI Image Generator](https://img.shields.io/badge/AI-Image%20Generator-blue)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- 🎨 Generate stunning images from text prompts
- 🤖 Multiple AI models to choose from (FLUX, Stable Diffusion)
- ⚡ Fast and responsive interface
- 📥 Download generated images
- 🔒 Secure API key management with serverless functions
- 💫 Beautiful UI with smooth animations

## 🚀 Live Demo

**[✨ Try it now: ai-image-generator-psi-five.vercel.app](https://ai-image-generator-psi-five.vercel.app)**

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Vercel Serverless Functions (Node.js)
- **AI API**: Hugging Face Inference API
- **Hosting**: Vercel

## 📋 Prerequisites

Before you begin, ensure you have:

- A [GitHub](https://github.com) account
- A [Vercel](https://vercel.com) account (free tier works great)
- A [Hugging Face](https://huggingface.co) account and API token

## 🔑 Getting Your Hugging Face API Token

1. Go to [Hugging Face](https://huggingface.co) and create an account (if you don't have one)
2. Navigate to **Settings** → **Access Tokens**
3. Click **New Token**
4. Give it a name (e.g., "AI Image Generator")
5. Select **Read** permission
6. Copy the token (you'll need it for deployment)

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
   - Add the following variable:
     - **Name**: `HUGGINGFACE_API_TOKEN`
     - **Value**: [Your Hugging Face API token]
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
   HUGGINGFACE_API_TOKEN=your_token_here
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
3. The function uses the **API token from environment variables** (secure)
4. It calls the **Hugging Face API** on your behalf
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

### "Server configuration error: API token not set"
- Make sure you added the `HUGGINGFACE_API_TOKEN` environment variable in Vercel
- Redeploy your project after adding the variable

### "Model is loading. Please wait 20-30 seconds and try again."
- This is normal for free-tier Hugging Face models
- Wait and try again after 30 seconds

### Images not generating
- Check the browser console for errors
- Verify your API token is valid
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

- [Hugging Face](https://huggingface.co) for the amazing AI models
- [Vercel](https://vercel.com) for free hosting and serverless functions
- The open-source community for inspiration

## 🔗 Useful Links

- [Hugging Face Models](https://huggingface.co/models)
- [Vercel Documentation](https://vercel.com/docs)
- [Hugging Face API Docs](https://huggingface.co/docs/api-inference/index)

---

**Made with ❤️ by AHANAF ABID SAZID**

If you found this project helpful, please give it a ⭐ on GitHub!
