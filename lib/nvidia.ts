export interface TranscriptionResult {
  text: string
  duration: number
  language: string
}

export async function transcribeAudio(audioBuffer: Buffer, filename: string = 'audio.mp3'): Promise<TranscriptionResult> {
  if (!process.env.NVIDIA_API_KEY) {
    throw new Error('NVIDIA_API_KEY environment variable not set')
  }

  try {
    console.log(`[Transcribe] Starting transcription for ${filename}`)

    // Create FormData with audio file
    const formData = new FormData()
    const blob = new Blob([new Uint8Array(audioBuffer)], { type: 'audio/mpeg' })
    formData.append('audio', blob, filename)

    // Call NVIDIA NIM API
    const response = await fetch(
      'https://ai.api.nvidia.com/v1/asr/nvidia/parakeet-ctc-1.1b-asr',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NVIDIA_API_KEY}`,
        },
        body: formData,
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`API request failed: ${response.status} ${response.statusText} - ${errorText}`)
    }

    const data = await response.json() as any

    // Handle NVIDIA API response format
    let transcribedText = ''
    let duration = 0

    if (data.result?.transcripts?.[0]?.transcript) {
      transcribedText = data.result.transcripts[0].transcript
      duration = data.result?.metadata?.duration || 0
    } else if (data.transcript) {
      transcribedText = data.transcript
      duration = data.duration || 0
    } else if (typeof data === 'string') {
      transcribedText = data
    }

    if (!transcribedText) {
      throw new Error('No transcription text received from API')
    }

    console.log(`[Transcribe] Transcription completed for ${filename}`)

    return {
      text: transcribedText.trim(),
      duration: Math.round(duration),
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
