# RockMount Voice Engine - Setup Instructions

## Quick Start (Recommended)

### Local Development

1. **Extract the ZIP file** to your desired location
2. **Install Node.js 18+** from https://nodejs.org/
3. **Open terminal/command prompt in the project directory**
4. **Run these commands:**
   ```bash
   npm install
   npm run dev
   ```
5. **Open your browser** to `http://localhost:4000`

### Cloud Deployment (Vercel)

This version is optimized for Vercel serverless deployment:

1. **Push to GitHub** (connect your repository)
2. **Add to Vercel** via https://vercel.com
3. **Set environment variable** in Vercel dashboard:
   - Name: `NVIDIA_API_KEY`
   - Value: Your NVIDIA API key from https://build.nvidia.com
4. **Deploy** - Vercel automatically builds and deploys

---

## Requirements

### Local Development
- **Node.js 18+** ([Download](https://nodejs.org/))
- **Any modern OS** (Windows, macOS, Linux)
- **4GB+ RAM**
- **Modern web browser** (Chrome, Edge, Firefox, Safari)

### Vercel Deployment
- **NVIDIA API Key** (free tier available at https://build.nvidia.com)
- **GitHub account** (to connect your repository)
- **Vercel account** (free tier available at https://vercel.com)

---

## Configuration

### Environment Variables

The `.env.local` file contains configuration:

```env
NVIDIA_API_KEY=your_nvidia_api_key_here
NODE_ENV=development
```

**Getting an API Key:**
1. Visit https://build.nvidia.com
2. Sign up for a free account
3. Create a new API key
4. Copy the key to `.env.local`

**For Vercel Deployment:**
- Do NOT commit `.env.local` to GitHub
- Add the key via Vercel dashboard: Settings → Environment Variables

---

## Usage

### Starting the Application

**Windows:**
- Double-click `START.bat`

**Other OS (Terminal):**
```bash
npm run dev
```

### Using the Application

1. **Open** http://localhost:4000 in your browser
2. **Upload** an MP3, WAV, M4A, OGG, or FLAC file
3. **Wait** for transcription to complete
4. **View** results in the application
5. **History** automatically saves all transcriptions

### Supported Audio Formats
- MP3
- WAV
- M4A
- OGG
- FLAC

---

## Troubleshooting

### "Node.js not found"
- Install Node.js from https://nodejs.org/
- Restart your terminal/command prompt after installation
- Verify with: `node --version`

### "npm install fails"
1. Delete `node_modules` folder
2. Delete `package-lock.json`
3. Run `npm install` again

### "API Key not found" (Vercel)
1. Add `NVIDIA_API_KEY` to Vercel environment variables
2. Select all environments (Development, Preview, Production)
3. Redeploy the application

### "Port 4000 already in use" (Local)
The application tries ports 4000-4010. If all are in use:
1. Close other applications using these ports
2. Or run: `npm run dev -- -p 5000`

### "Transcription fails" 
1. Verify NVIDIA_API_KEY is set correctly
2. Check API key has sufficient quota at https://build.nvidia.com
3. Check internet connection (cloud API requires connectivity)

### Application won't start
1. Delete the `.next` folder
2. Run `npm install`
3. Run `npm run dev`

---

## File Structure

```
rockmount-voice-engine/
├── package.json              # Project dependencies
├── app/                      # Next.js application code
│   ├── page.tsx             # Main dashboard
│   ├── layout.tsx           # Root layout
│   ├── globals.css          # Styles
│   └── api/                 # Backend API routes
│       ├── transcribe/route.ts    # Single file transcription
│       ├── batch-transcribe/      # Batch processing
│       └── history/               # History management
├── components/              # React UI components
├── lib/                      # Utility functions & API client
├── public/                   # Static files
├── .env.local               # Configuration (local only, in .gitignore)
└── .env.example             # Template for .env.local
```

---

## Using on Another Computer

For local development on another computer:

1. **Copy the project folder** (without `node_modules`)
2. **Ensure the new computer has:**
   - Node.js 18+
3. **Copy `.env.local`** with your NVIDIA API key
4. **Run:**
   ```bash
   npm install
   npm run dev
   ```

For Vercel deployment, you only need:
1. **Push to GitHub**
2. **Connect to Vercel**
3. **Add API key in Vercel dashboard**

---

## What's Included

✓ Professional transcription dashboard
✓ Local audio file processing (no uploads to servers)
✓ Automatic history tracking
✓ Batch file processing
✓ Beautiful UI with animations
✓ Real-time progress tracking
✓ Copy to clipboard functionality
✓ Responsive design

---

## Support & Resources

- **NVIDIA Build:** https://build.nvidia.com (API keys)
- **NVIDIA NIM Documentation:** https://docs.nvidia.com/nim/
- **Vercel Deployment:** https://vercel.com/docs
- **Next.js Documentation:** https://nextjs.org/docs
- **Node.js Help:** https://nodejs.org/en/docs/

---

## License

RockMount Voice Engine - 2026

---

**Enjoy fast, accurate audio transcription!** 🎙️✨
