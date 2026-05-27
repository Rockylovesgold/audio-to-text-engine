export interface TranscriptionResult {
  text: string
  duration: number
  language: string
}

export async function transcribeAudio(audioBuffer: Buffer, filename: string = 'audio.mp3'): Promise<TranscriptionResult> {
  try {
    console.log(`[Transcribe] Starting transcription for ${filename}`)

    // Use Hugging Face free Inference API for ASR
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 50000) // 50s timeout

    const response = await fetch(
      'https://api-inference.huggingface.co/models/openai/whisper-base',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/octet-stream',
        },
        body: audioBuffer,
        signal: controller.signal,
      }
    )
    clearTimeout(timeoutId)

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`API request failed: ${response.status} ${response.statusText}`)
    }

    const data = await response.json() as any

    // Parse Hugging Face Whisper response
    let transcribedText = ''

    if (data.text) {
      transcribedText = data.text
    } else if (data[0]?.text) {
      transcribedText = data[0].text
    } else if (typeof data === 'string') {
      transcribedText = data
    }

    if (!transcribedText) {
      throw new Error('No transcription text received from API')
    }

    console.log(`[Transcribe] Transcription completed for ${filename}`)

    return {
      text: transcribedText.trim(),
      duration: Math.ceil(audioBuffer.length / 32000), // Estimate from buffer size
      language: 'en',
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(`[Transcribe] Error: ${error.message}`)
      throw new Error(`Transcription failed: ${error.message}`)
    }
    throw new Error('Transcription failed: Unknown error')
  }
}
