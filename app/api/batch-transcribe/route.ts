import { NextRequest, NextResponse } from 'next/server'
import { transcribeAudio } from '@/lib/nvidia'
import { addRecord } from '@/lib/history'
import type { TranscriptionRecord } from '@/lib/history'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const files = formData.getAll('audio') as File[]

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'No audio files provided' },
        { status: 400 }
      )
    }

    const results: TranscriptionRecord[] = []
    const errors: { filename: string; error: string }[] = []

    // Process files sequentially to reuse cached model instance
    for (const file of files) {
      try {
        const buffer = Buffer.from(await file.arrayBuffer())
        const filename = file.name || 'audio.mp3'

        const { text, duration } = await transcribeAudio(buffer, filename)

        const wordCount = text.split(/\s+/).filter(w => w.length > 0).length
        const durationSec = duration

        const record = await addRecord({
          filename,
          text,
          wordCount,
          durationSec,
          model: 'Whisper Base',
        })

        results.push(record)
      } catch (error) {
        errors.push({
          filename: file.name || 'unknown',
          error: error instanceof Error ? error.message : 'Transcription failed',
        })
      }
    }

    return NextResponse.json({
      results,
      errors,
      total: files.length,
      successful: results.length,
      failed: errors.length,
    })
  } catch (error) {
    console.error('Batch transcription error:', error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Batch transcription failed',
      },
      { status: 500 }
    )
  }
}
