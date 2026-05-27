import { NextRequest, NextResponse } from 'next/server'
import { getHistory, clearHistory } from '@/lib/history'

export async function GET() {
  try {
    const history = await getHistory()
    return NextResponse.json(history)
  } catch (error) {
    console.error('History fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch history' },
      { status: 500 }
    )
  }
}

export async function DELETE() {
  try {
    await clearHistory()
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('History clear error:', error)
    return NextResponse.json(
      { error: 'Failed to clear history' },
      { status: 500 }
    )
  }
}
