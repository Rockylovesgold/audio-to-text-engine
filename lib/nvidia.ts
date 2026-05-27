import { execSync } from 'child_process'
import { writeFileSync, unlinkSync } from 'fs'
import { join } from 'path'

export interface TranscriptionResult {
  text: string
  duration: number
  language: string
}

export async function transcribeAudio(audioBuffer: Buffer, filename: string = 'audio.mp3'): Promise<TranscriptionResult> {
  const tempDir = join(process.cwd(), '.transcribe-temp')
  const tempFile = join(tempDir, filename)

  try {
    // Ensure temp directory exists
    try {
      require('fs').mkdirSync(tempDir, { recursive: true })
    } catch {}

    // Write audio buffer to temp file
    writeFileSync(tempFile, audioBuffer)

    console.log(`Transcribing ${filename}...`)

    // Call Python transcription script
    const pythonScript = join(process.cwd(), 'transcribe.py')

    console.log(`[Transcribe] Starting Python script for ${filename}`)

    let output: string
    try {
      output = execSync(`python "${pythonScript}" "${tempFile}" tiny 3`, {
        encoding: 'utf-8',
        timeout: 900000, // 15 minute timeout for first model download
        stdio: ['pipe', 'pipe', 'pipe'],
        maxBuffer: 50 * 1024 * 1024, // 50MB buffer
      })
      console.log(`[Transcribe] Python script completed`)
    } catch (execError: any) {
      console.error(`[Transcribe] Python script error:`, execError.message)
      throw new Error(`Python execution failed: ${execError.message}`)
    }

    const result = JSON.parse(output)

    if (result.error) {
      throw new Error(result.error)
    }

    if (!result.text) {
      throw new Error('No transcription text received')
    }

    return {
      text: result.text,
      duration: Math.round(result.duration_seconds || 0),
      language: result.language || 'en',
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Transcription failed: ${error.message}`)
    }
    throw new Error('Transcription failed: Unknown error')
  } finally {
    // Clean up temp file
    try {
      unlinkSync(tempFile)
    } catch {}
  }
}
