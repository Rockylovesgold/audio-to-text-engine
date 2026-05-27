#!/usr/bin/env python3
"""
Audio Transcription Helper using faster-whisper
Optimized for speed and accuracy
"""

import sys
import json
from pathlib import Path
import os

# Global model instance for reuse
_model_instance = None

def get_model(model_size: str = "tiny"):
    """Get or create cached Whisper model instance"""
    global _model_instance

    if _model_instance is not None:
        return _model_instance

    try:
        from faster_whisper import WhisperModel

        sys.stderr.write(f"Loading Whisper {model_size} model...\n")
        sys.stderr.flush()

        _model_instance = WhisperModel(
            model_size,
            device="cpu",
            compute_type="int8"
        )

        sys.stderr.write("Model loaded successfully\n")
        sys.stderr.flush()
        return _model_instance

    except Exception as e:
        sys.stderr.write(f"ERROR loading model: {str(e)}\n")
        sys.stderr.flush()
        raise RuntimeError(f"Failed to load model: {str(e)}")

def transcribe_audio(audio_file_path: str, model_size: str = "tiny", language: str = "en", beam_size: int = 3) -> dict:
    """Transcribe audio file"""
    try:
        # Check file exists
        if not Path(audio_file_path).exists():
            raise FileNotFoundError(f"Audio file not found: {audio_file_path}")

        filename = Path(audio_file_path).name

        sys.stderr.write(f"Transcribing {filename}...\n")
        sys.stderr.flush()

        # Get model
        model = get_model(model_size)

        # Transcribe
        sys.stderr.write("Starting transcription...\n")
        sys.stderr.flush()

        segments, info = model.transcribe(
            audio_file_path,
            language=language,
            beam_size=min(beam_size, 3),
            best_of=1,
            patience=0.5,
            temperature=0.0
        )

        # Collect text
        sys.stderr.write("Collecting segments...\n")
        sys.stderr.flush()

        text = " ".join(segment.text.strip() for segment in segments).strip()

        sys.stderr.write(f"Transcription complete. Got {len(text)} characters\n")
        sys.stderr.flush()

        if not text:
            raise ValueError("No speech detected in audio file")

        return {
            "text": text,
            "language": info.language or language,
            "duration_seconds": float(info.duration) if hasattr(info, 'duration') else 0
        }

    except Exception as e:
        sys.stderr.write(f"Transcription error: {str(e)}\n")
        sys.stderr.flush()
        raise RuntimeError(f"Transcription failed: {str(e)}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "Usage: python transcribe.py <audio_file> [model_size] [beam_size]"}))
        sys.exit(1)

    try:
        audio_file = sys.argv[1]
        model_size = sys.argv[2] if len(sys.argv) > 2 else "tiny"
        beam_size = int(sys.argv[3]) if len(sys.argv) > 3 else 3

        result = transcribe_audio(audio_file, model_size, beam_size=beam_size)
        print(json.dumps(result))

    except Exception as e:
        error_msg = str(e) if str(e) else "Unknown error"
        print(json.dumps({"error": error_msg}))
        sys.exit(1)
