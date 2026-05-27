export interface TranscriptionResult {
  text: string
  duration: number
  language: string
}

export async function transcribeAudio(audioBuffer: Buffer, filename: string = 'audio.mp3'): Promise<TranscriptionResult> {
  try {
    console.log(`[Transcribe] Starting transcription for ${filename}`)

    // Use AssemblyAI free tier for reliable transcription
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 50000)

    // Create form data with audio
    const formData = new FormData()
    formData.append('audio_data', new Blob([audioBuffer]))

    const response = await fetch(
      'https://api.assemblyai.com/v2/transcribe',
      {
        method: 'POST',
        headers: {
          'Authorization': 'da5f96c0e3ff4c1ebf7e8c3d2f1a9b8c',
        },
        body: formData,
        signal: controller.signal,
      }
    )
    clearTimeout(timeoutId)

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`[Transcribe] API error: ${response.status} - ${errorText}`)
      throw new Error(`API request failed: ${response.status}`)
    }

    const data = await response.json() as any

    let transcribedText = ''

    if (data.text) {
      transcribedText = data.text
    } else if (data.result?.text) {
      transcribedText = data.result.text
    }

    if (!transcribedText) {
      console.error(`[Transcribe] No text in response:`, data)
      throw new Error('No transcription text received')
    }

    console.log(`[Transcribe] Transcription completed for ${filename}`)

    return {
      text: transcribedText.trim(),
      duration: Math.ceil(audioBuffer.length / 32000),
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
