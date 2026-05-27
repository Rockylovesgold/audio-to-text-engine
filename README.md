# RockMount Voice Engine

A professional, beautiful MP3-to-text transcription dashboard powered by NVIDIA NIM's Parakeet ASR model.

## Features

- 🎙️ **Drag & Drop Upload** - Simply drag MP3 files or click to upload
- ⚡ **Fast Transcription** - Powered by NVIDIA Parakeet TDT-1.1B (sub-second accuracy)
- 💾 **Local History** - All transcriptions stored locally on your machine
- 📊 **Transcription Stats** - Word count, duration, and model info
- 🎨 **Professional UI** - Clean, dark interface with RockMount branding
- 📋 **Copy & Download** - Easily copy to clipboard or download as TXT
- 🔐 **Private** - Your audio and transcriptions never leave your server

## Tech Stack

- **Frontend:** Next.js 14 + React 19 + Tailwind CSS
- **Backend:** Next.js API Routes + Node.js
- **ASR Model:** NVIDIA Parakeet TDT-1.1B via NVIDIA NIM API
- **Storage:** Local JSON file (no database required)
- **Styling:** Tailwind CSS with custom dark theme

## Quick Start

### Prerequisites

- Node.js 18+ 
- Free NVIDIA API Key from [build.nvidia.com](https://build.nvidia.com)

### Setup

1. **Get your NVIDIA API Key:**
   - Visit https://build.nvidia.com
   - Sign up for free
   - Create an API key
   - Copy the key to clipboard

2. **Set up environment:**
   ```bash
   cd C:\Users\Rocky\Desktop\rockmount-voice-engine
   cp .env.local.example .env.local
   ```

3. **Add your API key to `.env.local`:**
   ```
   NVIDIA_API_KEY=your-api-key-here
   ```

4. **Install dependencies:**
   ```bash
   npm install
   ```

5. **Start development server:**
   ```bash
   npm run dev
   ```

6. **Open in browser:**
   - Visit `http://localhost:3000`
   - Upload an MP3 file and watch it transcribe!

## Usage

1. **Upload Audio:**
   - Drag MP3 file into the upload zone OR click to browse
   - Supported formats: MP3, WAV, M4A, OGG, FLAC

2. **View Results:**
   - Transcription appears within seconds
   - Stats show word count, duration, and model used

3. **Manage History:**
   - All transcriptions saved automatically
   - Click items in history to expand and copy
   - Clear all history with one click

## Project Structure

```
rockmount-voice-engine/
├── app/
│   ├── page.tsx           # Main dashboard
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Tailwind + theme
│   └── api/
│       ├── transcribe/    # POST transcription endpoint
│       └── history/       # GET/DELETE history endpoint
├── components/
│   ├── UploadZone.tsx     # Drag-drop uploader
│   ├── TranscriptionResult.tsx  # Result display
│   ├── HistoryList.tsx    # History browser
│   └── StatsBar.tsx       # Stats display
├── lib/
│   ├── nvidia.ts          # NVIDIA NIM client
│   └── history.ts         # History management
└── data/
    └── history.json       # Persisted records
```

## API Endpoints

### POST `/api/transcribe`
Upload an audio file for transcription.

**Request:**
```bash
curl -X POST http://localhost:3000/api/transcribe \
  -F "audio=@your-file.mp3"
```

**Response:**
```json
{
  "id": "1716816000000",
  "filename": "your-file.mp3",
  "text": "The transcribed text goes here...",
  "wordCount": 42,
  "durationSec": 15,
  "model": "Parakeet TDT-1.1B",
  "timestamp": "2026-05-27T14:00:00.000Z"
}
```

### GET `/api/history`
Retrieve all previous transcriptions.

**Response:**
```json
[
  {
    "id": "1716816000000",
    "filename": "your-file.mp3",
    "text": "...",
    "wordCount": 42,
    "durationSec": 15,
    "model": "Parakeet TDT-1.1B",
    "timestamp": "2026-05-27T14:00:00.000Z"
  }
]
```

### DELETE `/api/history`
Clear all transcription history.

## Configuration

### Environment Variables

- `NVIDIA_API_KEY` - Required. Get free key from [build.nvidia.com](https://build.nvidia.com)

### Tailwind Theme

Colors defined in `tailwind.config.ts`:
- **Background:** `#0a0a0f` (dark-950)
- **Cards:** `#111118` (dark-900)
- **Border:** `#1f1f2e` (dark-800)
- **Gold Accent:** `#f5a623`

## Building for Production

```bash
# Build
npm run build

# Start production server
npm start
```

Then deploy to:
- **Vercel** (recommended) - `vercel deploy`
- **Docker** - Create a Dockerfile for containerization
- **Any Node.js host** - Upload and run with `npm start`

## Troubleshooting

### "API Key invalid" error
- Check `.env.local` has correct `NVIDIA_API_KEY`
- Make sure API key is from https://build.nvidia.com (not Anthropic or OpenAI)
- Try generating a new key on the dashboard

### Transcription fails with timeout
- Free tier may have rate limits
- Wait a moment and retry
- Consider upgrading NVIDIA API tier for production

### History not saving
- Check `data/` directory exists and is writable
- Ensure the app has write permissions
- Check file system has available space

## License

MIT - Feel free to use and modify for your projects!

## Support

Built by Rocky Jenkinson
- Email: rockyjenkinson07@gmail.com
- Project: RockMount AI
