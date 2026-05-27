# RockMount Voice Engine - Setup Instructions

## Quick Start (Recommended)

### Option 1: Automatic Setup (Windows)

1. **Extract the ZIP file** to your desired location
2. **Double-click `SETUP.bat`** - This will automatically:
   - Check for Node.js and Python installation
   - Install all npm dependencies
   - Install Python voice transcription libraries
   - Create necessary configuration files
3. **Wait for setup to complete** (takes 2-3 minutes)
4. **Double-click `START.bat`** to launch the application
5. **Open your browser** to `http://localhost:4000`

### Option 2: Manual Setup (Any OS)

1. **Extract the ZIP file**
2. **Install Node.js 18+** from https://nodejs.org/
3. **Install Python 3.8+** from https://www.python.org/
4. **Open terminal/command prompt in the project directory**
5. **Run these commands:**
   ```bash
   npm install
   python -m pip install faster-whisper
   npm run dev
   ```
6. **Open your browser** to `http://localhost:4000`

---

## Requirements

### System Requirements
- **Windows 10/11** (or Linux/Mac with Node.js)
- **4GB+ RAM** (for Whisper model)
- **Node.js 18+** ([Download](https://nodejs.org/))
- **Python 3.8+** ([Download](https://www.python.org/))
- **Disk Space**: ~500MB for models

### Browser Support
- Chrome/Edge/Firefox (latest versions)
- Requires JavaScript enabled

---

## Configuration

### Environment Variables

The `.env.local` file contains configuration. Update it if needed:

```env
NVIDIA_API_KEY=your_key_here
```

**Note:** The current setup uses local Whisper for transcription, so you don't need an API key unless you modify the code to use NVIDIA endpoints.

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

### "Python not found"
- Install Python from https://www.python.org/
- **Important:** Check "Add Python to PATH" during installation
- Restart your terminal after installation
- Verify with: `python --version`

### "Port 4000 already in use"
The application tries ports 4000-4010. If all are in use:
1. Close other applications using these ports
2. Or modify package.json: change `"next dev"` to `"next dev -p 5000"`

### "Transcription taking too long"
- First transcription downloads the AI model (~500MB) - this is normal
- Subsequent transcriptions are much faster
- Model is cached locally for speed

### "Out of memory errors"
- Close other applications
- The Whisper model requires significant memory
- Ensure you have at least 4GB free RAM

### Application won't start
1. Delete the `.next` folder
2. Run SETUP.bat again
3. Then run START.bat

---

## File Structure

```
rockmount-voice-engine/
├── SETUP.bat                 # Run this first (Windows)
├── START.bat                 # Run this to launch app (Windows)
├── package.json              # Project dependencies
├── app/                      # Next.js application code
│   ├── page.tsx             # Main dashboard
│   ├── layout.tsx           # Root layout
│   ├── globals.css          # Styles
│   └── api/                 # Backend API routes
├── components/              # React components
├── lib/                      # Utility functions
├── public/                   # Static files
├── transcribe.py            # Python transcription script
├── .env.local               # Configuration (keep secret)
└── data/                    # Local history storage
```

---

## Moving to Another Computer

To use this setup on another computer:

1. **Copy the entire folder** (without node_modules)
2. **Ensure the new computer has:**
   - Node.js 18+
   - Python 3.8+
3. **Double-click SETUP.bat** - it will reinstall everything
4. **Double-click START.bat** to launch

The `.env.local` file will be preserved and settings will work on the new computer.

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

- **Next.js Documentation:** https://nextjs.org/docs
- **Faster-Whisper:** https://github.com/SYSTRAN/faster-whisper
- **Node.js Help:** https://nodejs.org/en/docs/

---

## License

RockMount Voice Engine - 2026

---

**Enjoy fast, accurate audio transcription!** 🎙️✨
