# RockMount Voice Engine - Mac/Linux Setup Guide

## Welcome! 👋

This guide will help you set up the RockMount Voice Engine on Mac or Linux in just 3 commands.

---

## ⚡ Quick Start (3 Steps)

### 1. **Open Terminal**
   - Mac: Press `Cmd + Space`, type "Terminal", press Enter
   - Linux: Open your terminal application

### 2. **Navigate to the folder**
   ```bash
   cd ~/Desktop/rockmount-voice-engine
   ```
   (or wherever you extracted the zip)

### 3. **Run setup**
   ```bash
   ./setup.sh
   ```
   Wait 2-3 minutes for installation to complete.

### 4. **Start the app**
   ```bash
   ./start.sh
   ```

### 5. **Open in browser**
   Visit: **http://localhost:4000**

---

## 📋 Pre-Setup Checklist

**Before running setup.sh, make sure you have:**

- ✅ Node.js 18+ installed ([Download here](https://nodejs.org/))
- ✅ Python 3.8+ installed ([Download here](https://www.python.org/))
- ✅ 4GB RAM available
- ✅ 500MB free disk space

**See PRE_SETUP_CHECKLIST.txt for detailed installation instructions**

---

## 🔍 Verify Installation

Open Terminal and check:

```bash
# Check Node.js
node --version    # Should show v18+

# Check npm
npm --version     # Should show 9+

# Check Python
python3 --version # Should show 3.8+
```

If any are missing, follow the PRE_SETUP_CHECKLIST.txt

---

## 📁 What setup.sh Does

The setup script automatically:

1. ✓ Checks for Node.js and Python
2. ✓ Installs all npm dependencies
3. ✓ Installs Python packages
4. ✓ Creates .env.local with API key
5. ✓ Prepares everything to run

**You only need to run it once.**

---

## 🚀 Starting the App

After setup.sh completes:

```bash
./start.sh
```

The server will start on: **http://localhost:4000**

**To stop:** Press `Ctrl+C` in Terminal

---

## 📝 Usage

1. Open http://localhost:4000 in your browser
2. Upload an MP3, WAV, M4A, OGG, or FLAC file
3. Watch it transcribe in real-time
4. Results are automatically saved to history

---

## 🛠️ Troubleshooting

### "command not found: node"
```bash
# Node.js not installed
# Download from https://nodejs.org/
# Then restart Terminal completely
```

### "command not found: python3"
```bash
# Python not installed
# Download from https://www.python.org/
# Or: brew install python3 (Mac)
```

### "Permission denied" for setup.sh
```bash
chmod +x setup.sh
./setup.sh
```

### Port 4000 already in use
- Close other applications using the port
- The system will try ports 4001-4009 automatically

### First transcription is slow
- The AI model downloads on first use (~500MB)
- This only happens once
- Subsequent transcriptions are instant

### Clear cache and restart
```bash
rm -rf .next node_modules
./setup.sh
```

---

## 🔑 API Configuration

The `.env.local` file is pre-configured with:

```
NVIDIA_API_KEY=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
NODE_ENV=development
```

**No changes needed.** Everything is ready to use!

---

## 📱 Features

✓ Single file transcription  
✓ Batch file processing  
✓ Real-time progress tracking  
✓ Automatic history saving  
✓ Copy to clipboard  
✓ Download as text  
✓ Beautiful UI with animations  
✓ Responsive design  
✓ Works offline after setup  

---

## 🔧 System Requirements

**Minimum:**
- macOS 10.13+ or Linux
- 4GB RAM
- 500MB disk space
- Node.js 18+
- Python 3.8+

**Supported Formats:**
- MP3
- WAV
- M4A
- OGG
- FLAC

---

## 📦 Portable Across Computers

To use on another Mac/Linux computer:

1. Copy the rockmount-voice-engine folder
2. Extract it on the new computer
3. Run `./setup.sh` (installs dependencies)
4. Run `./start.sh` (launches app)

The `.env.local` configuration travels with it. All settings work automatically on the new computer.

---

## 🎯 Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+C` | Stop the server in Terminal |
| `Cmd+Q` | Quit Terminal |
| `Cmd+W` | Close Terminal window |

---

## 📞 Need Help?

1. **Check PRE_SETUP_CHECKLIST.txt** for system requirements
2. **Review the troubleshooting section** above
3. **Check Terminal output** for error messages
4. **Try deleting .next and node_modules** and reinstalling

---

## 🎉 Ready?

```bash
# Navigate to folder
cd ~/Desktop/rockmount-voice-engine

# Run setup (first time only)
./setup.sh

# Start the app
./start.sh

# Open in browser
# http://localhost:4000
```

**Enjoy fast, accurate audio transcription!** 🎙️✨

---

*RockMount Voice Engine - 2026*
