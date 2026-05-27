'use client'

import { useState } from 'react'
import type { TranscriptionRecord } from '@/lib/history'

interface HistoryListProps {
  records: TranscriptionRecord[]
  onSelectRecord: (record: TranscriptionRecord) => void
  onClearHistory: () => void
}

export default function HistoryList({
  records,
  onSelectRecord,
  onClearHistory,
}: HistoryListProps) {
  const [expanded, setExpanded] = useState<string | null>(null)

  const formatDate = (isoString: string) => {
    const date = new Date(isoString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined,
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (records.length === 0) {
    return (
      <div className="card text-center py-8">
        <p className="text-dark-600">No transcriptions yet. Upload an audio file to get started!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          History — {records.length} transcription{records.length !== 1 ? 's' : ''}
        </h3>
        {records.length > 0 && (
          <button
            onClick={onClearHistory}
            className="btn-secondary text-sm"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="space-y-2">
        {records.map((record) => (
          <div key={record.id} className="card">
            <button
              onClick={() => {
                setExpanded(expanded === record.id ? null : record.id)
                onSelectRecord(record)
              }}
              className="w-full text-left hover:text-gold-500 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-dark-600">
                      {expanded === record.id ? '▼' : '▶'}
                    </span>
                    <span className="font-semibold truncate">{record.filename}</span>
                  </div>
                  <div className="text-sm text-dark-600 flex gap-4">
                    <span>{formatDate(record.timestamp)}</span>
                    <span>{record.wordCount} words</span>
                  </div>
                </div>
              </div>
            </button>

            {expanded === record.id && (
              <div className="mt-4 pt-4 border-t border-dark-800">
                <p className="text-dark-50 text-sm leading-relaxed line-clamp-4">
                  {record.text}
                </p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(record.text)
                  }}
                  className="mt-3 btn-secondary text-xs py-1 px-3"
                >
                  Copy
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
