import fs from 'fs/promises'
import path from 'path'
import { randomUUID } from 'crypto'

const DATA_DIR = path.join(process.cwd(), 'data')
const HISTORY_FILE = path.join(DATA_DIR, 'history.json')

export interface TranscriptionRecord {
  id: string
  filename: string
  text: string
  wordCount: number
  durationSec: number
  timestamp: string
  model: string
}

async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true })
  } catch (e) {
    // Directory may already exist
  }
}

async function readHistory(): Promise<TranscriptionRecord[]> {
  await ensureDataDir()
  try {
    const data = await fs.readFile(HISTORY_FILE, 'utf-8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

async function writeHistory(records: TranscriptionRecord[]) {
  await ensureDataDir()
  await fs.writeFile(HISTORY_FILE, JSON.stringify(records, null, 2))
}

export async function addRecord(record: Omit<TranscriptionRecord, 'id' | 'timestamp'>): Promise<TranscriptionRecord> {
  const history = await readHistory()
  const newRecord: TranscriptionRecord = {
    ...record,
    id: randomUUID(),
    timestamp: new Date().toISOString(),
  }
  history.unshift(newRecord)
  // Keep only last 50 records
  if (history.length > 50) {
    history.pop()
  }
  await writeHistory(history)
  return newRecord
}

export async function getHistory(): Promise<TranscriptionRecord[]> {
  return readHistory()
}

export async function clearHistory() {
  await ensureDataDir()
  await fs.writeFile(HISTORY_FILE, JSON.stringify([], null, 2))
}
