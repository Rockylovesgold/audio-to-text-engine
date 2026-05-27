'use client'

import { useState } from 'react'

interface TranscriptionResultProps {
  text: string
  filename: string
  wordCount: number
  durationSec: number
  model: string
}

export default function TranscriptionResult({
  text,
  filename,
  wordCount,
  durationSec,
  model,
}: TranscriptionResultProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const element = document.createElement('a')
    element.setAttribute(
      'href',
      `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`
    )
    element.setAttribute('download', `${filename}.txt`)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const formatDuration = (sec: number) => {
    const mins = Math.floor(sec / 60)
    const secs = sec % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Transcription Result</h3>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="btn-secondary text-sm"
          >
            {copied ? '✓ Copied' : 'Copy Text'}
          </button>
          <button
            onClick={handleDownload}
            className="btn-secondary text-sm"
          >
            Download
          </button>
        </div>
      </div>

      <div className="card">
        <div className="max-h-64 overflow-y-auto mb-4">
          <p className="text-dark-50 leading-relaxed">{text}</p>
        </div>

        <div className="border-t border-dark-800 pt-4">
          <div className="grid grid-cols-4 gap-4">
            <div>
              <p className="text-dark-600 text-sm">File</p>
              <p className="font-semibold truncate">{filename}</p>
            </div>
            <div>
              <p className="text-dark-600 text-sm">Words</p>
              <p className="font-semibold">{wordCount}</p>
            </div>
            <div>
              <p className="text-dark-600 text-sm">Duration</p>
              <p className="font-semibold">{formatDuration(durationSec)}</p>
            </div>
            <div>
              <p className="text-dark-600 text-sm">Model</p>
              <p className="font-semibold text-sm">{model}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
