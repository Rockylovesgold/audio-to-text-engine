export interface TranscriptionResult {
  text: string
  duration: number
  language: string
}

export async function transcribeAudio(audioBuffer: Buffer, filename: string = 'audio.mp3'): Promise<TranscriptionResult> {
  // Validate input
  if (!audioBuffer || audioBuffer.length === 0) {
    throw new Error('Invalid audio file: empty buffer')
  }

  if (audioBuffer.length > 25 * 1024 * 1024) {
    throw new Error('File too large: maximum 25MB')
  }

  try {
    console.log(`[Transcribe] Starting transcription for ${filename} (${audioBuffer.length} bytes)`)

    const controller = new AbortController()
    const timeoutId = setTimeout(() => {
      controller.abort()
      console.log('[Transcribe] Request timeout')
    }, 50000)

    try {
      // Convert buffer to base64 for reliable transmission
      const base64Audio = audioBuffer.toString('base64')

      const response = await fetch(
        'https://api.assemblyai.com/v2/transcribe',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'da5f96c0e3ff4c1ebf7e8c3d2f1a9b8c',
          },
          body: JSON.stringify({
            audio_data: base64Audio,
            language_code: 'en',
          }),
          signal: controller.signal,
        }
      )

      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorText = await response.text().catch(() => 'Unknown error')
        console.error(`[Transcribe] API error: ${response.status} - ${errorText}`)

        if (response.status === 401) {
          throw new Error('API key invalid')
        } else if (response.status === 429) {
          throw new Error('Rate limit exceeded - please try again later')
        } else if (response.status >= 500) {
          throw new Error('Transcription service temporarily unavailable')
        }
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()

      if (!data || typeof data !== 'object') {
        throw new Error('Invalid API response format')
      }

      let transcribedText = ''

      if (typeof data.text === 'string' && data.text.trim()) {
        transcribedText = data.text
      } else if (data.result?.text) {
        transcribedText = data.result.text
      } else if (data.transcript) {
        transcribedText = data.transcript
      }

      if (!transcribedText || transcribedText.trim() === '') {
        console.warn('[Transcribe] Empty transcription received')
        throw new Error('Unable to transcribe audio - please try a different file')
      }

      const duration = Math.max(1, Math.ceil(audioBuffer.length / 32000))

      console.log(`[Transcribe] Success: ${transcribedText.length} characters`)

      return {
        text: transcribedText.trim(),
        duration,
        language: 'en',
      }
    } catch (fetchError) {
      clearTimeout(timeoutId)

      if (fetchError instanceof TypeError && fetchError.message.includes('fetch')) {
        throw new Error('Network error - check your connection')
      }
      if (fetchError instanceof Error && fetchError.name === 'AbortError') {
        throw new Error('Request timed out - file may be too large or connection too slow')
      }
      throw fetchError
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(`[Transcribe] Error: ${error.message}`)
      throw error
    }
    console.error('[Transcribe] Unknown error:', error)
    throw new Error('Transcription failed: Unknown error')
  }
}
