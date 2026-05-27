'use client'

import { useRef, useState } from 'react'

interface UploadZoneProps {
  onUpload: (file: File) => Promise<void>
  isLoading: boolean
  isBatchMode: boolean
}

export default function UploadZone({ onUpload, isLoading, isBatchMode }: UploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('audio/')) {
      onUpload(file)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0]
    if (file) {
      onUpload(file)
    }
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => !isLoading && inputRef.current?.click()}
      style={{
        border: `2px dashed ${isDragging ? 'var(--p)' : 'var(--bd2)'}`,
        borderRadius: 'var(--r5)',
        padding: '80px 40px',
        textAlign: 'center',
        cursor: isLoading ? 'not-allowed' : 'pointer',
        background: isDragging ? 'linear-gradient(135deg, var(--ps) 0%, rgba(37,99,235,0.05) 100%)' : 'var(--sur)',
        boxShadow: isDragging ? '0 0 0 6px rgba(37,99,235,.12), var(--sh2)' : 'var(--sh1)',
        transition: 'all 0.2s var(--ease)',
        opacity: isLoading ? 0.6 : 1,
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="audio/*"
        onChange={handleFileSelect}
        disabled={isLoading}
        style={{ display: 'none' }}
      />
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: 'var(--r4)',
          background: isDragging ? 'linear-gradient(135deg, var(--p), var(--sec))' : 'var(--ps)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px',
          fontSize: 32,
          transition: 'all 0.2s var(--ease)',
          boxShadow: isDragging ? 'var(--sh2)' : 'none',
        }}
      >
        🎙️
      </div>
      <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12, color: 'var(--tx)' }}>
        {isDragging ? '📥 Drop your file here' : '🎵 Choose or drop your audio file'}
      </h3>
      <p style={{ color: 'var(--tx2)', marginBottom: 12, fontSize: 14 }}>
        Supports MP3, WAV, M4A, OGG, FLAC
      </p>
      <p style={{ fontSize: 12, color: 'var(--tx3)' }}>
        Transcription starts automatically after upload
      </p>
    </div>
  )
}
