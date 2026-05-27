import { NextRequest, NextResponse } from 'next/server'
import { transcribeAudio } from '@/lib/nvidia'
import { addRecord } from '@/lib/history'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('audio') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No audio file provided' },
        { status: 400 }
      )
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const filename = file.name || 'audio.mp3'

    // Transcribe using Whisper
    const { text, duration } = await transcribeAudio(buffer, filename)

    // Calculate stats
    const wordCount = text.split(/\s+/).filter(w => w.length > 0).length
    const durationSec = duration

    // Save to history
    const record = await addRecord({
      filename,
      text,
      wordCount,
      durationSec,
      model: 'NVIDIA Parakeet',
    })

    return NextResponse.json(record)
  } catch (error) {
    console.error('Transcription error:', error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Transcription failed',
      },
      { status: 500 }
    )
  }
}
