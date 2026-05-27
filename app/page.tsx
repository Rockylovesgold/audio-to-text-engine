'use client'

import { useState, useEffect } from 'react'
import UploadZone from '@/components/UploadZone'
import TranscriptionResult from '@/components/TranscriptionResult'
import HistoryList from '@/components/HistoryList'
import ProgressBar from '@/components/ProgressBar'
import type { TranscriptionRecord } from '@/lib/history'

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [progressMessage, setProgressMessage] = useState('')
  const [currentResult, setCurrentResult] = useState<TranscriptionRecord | null>(null)
  const [history, setHistory] = useState<TranscriptionRecord[]>([])
  const [isBatchMode, setIsBatchMode] = useState(false)
  const [batchResults, setBatchResults] = useState<TranscriptionRecord[]>([])

  useEffect(() => {
    loadHistory()
  }, [])

  const loadHistory = async () => {
    try {
      const response = await fetch('/api/history')
      const data = await response.json()
      setHistory(data)
    } catch (error) {
      console.error('Failed to load history:', error)
    }
  }

  const handleUpload = async (file: File) => {
    setIsLoading(true)
    setProgress(0)

    try {
      setProgressMessage('📁 Preparing audio file...')
      setProgress(5)
      await new Promise(r => setTimeout(r, 200))

      setProgressMessage('📤 Uploading...')
      setProgress(15)

      const formData = new FormData()
      formData.append('audio', file)

      setProgressMessage('✨ Transcribing audio...')
      setProgress(30)

      const startTime = Date.now()

      const response = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorText = await response.text().catch(() => '')
        let errorMsg = 'Transcription failed'
        try {
          const errorData = JSON.parse(errorText)
          errorMsg = errorData.error || errorMsg
        } catch {}
        throw new Error(errorMsg)
      }

      const transTime = Date.now() - startTime

      setProgress(75)
      setProgressMessage(`⏱️ Transcribed in ${Math.round(transTime / 1000)}s`)

      const result = await response.json() as TranscriptionRecord

      setProgress(85)
      setProgressMessage('💾 Saving to history...')

      setCurrentResult(result)
      setHistory((prev) => [result, ...prev])

      setProgress(95)
      setProgressMessage('✅ Complete!')
      setProgress(100)

      setTimeout(() => {
        setIsLoading(false)
        setProgress(0)
      }, 600)
    } catch (error) {
      console.error('Upload error:', error)
      setIsLoading(false)
      setProgress(0)
      alert(
        error instanceof Error
          ? error.message
          : 'Failed to transcribe audio.'
      )
    }
  }

  const handleBatchUpload = async (files: File[]) => {
    setIsLoading(true)
    setProgress(0)

    try {
      setProgressMessage(`📁 Preparing ${files.length} files...`)
      setProgress(5)
      await new Promise(r => setTimeout(r, 200))

      setProgressMessage(`📤 Uploading ${files.length} files...`)
      setProgress(15)

      const formData = new FormData()
      files.forEach(f => formData.append('audio', f))

      setProgressMessage('✨ Transcribing batch...')
      setProgress(30)

      const response = await fetch('/api/batch-transcribe', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorText = await response.text().catch(() => '')
        let errorMsg = 'Batch transcription failed'
        try {
          const errorData = JSON.parse(errorText)
          errorMsg = errorData.error || errorMsg
        } catch {}
        throw new Error(errorMsg)
      }

      setProgress(75)

      const data = await response.json()
      const { results, errors, successful, failed } = data

      setProgressMessage('💾 Saving to history...')
      setProgress(85)

      setBatchResults(results)
      setHistory((prev) => [...results.reverse(), ...prev])

      setProgress(95)

      if (failed > 0) {
        alert(`✅ Batch complete: ${successful} succeeded, ${failed} failed`)
      } else {
        setProgressMessage(`✅ All ${successful} files transcribed!`)
      }

      setProgress(100)

      setTimeout(() => {
        setIsLoading(false)
        setProgress(0)
      }, 600)
    } catch (error) {
      console.error('Batch upload error:', error)
      setIsLoading(false)
      setProgress(0)
      alert(error instanceof Error ? error.message : 'Failed to transcribe batch.')
    }
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'linear-gradient(135deg, var(--bg) 0%, rgba(37,99,235,0.02) 100%)' }}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: var(--sh1); }
          50% { box-shadow: var(--sh-glow); }
        }
        .animate-in {
          animation: fadeIn 0.5s var(--ease) both;
        }
        .btn-hover {
          transition: all var(--dur) var(--ease);
        }
        .btn-hover:hover {
          transform: translateY(-2px);
          box-shadow: var(--sh-glow);
        }
      `}</style>

      <ProgressBar isVisible={isLoading} progress={progress} message={progressMessage} />

      {/* Header */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 40, borderBottom: '1.5px solid var(--bd)', background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)', height: 'var(--th)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', animation: 'slideIn 0.6s var(--ease)' }}>
            <div style={{ fontSize: 28, fontWeight: 700, background: 'linear-gradient(135deg, var(--p), var(--sec))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>⚡</div>
            <div>
              <h1 style={{ fontSize: 20, fontWeight: 700, margin: 0, color: 'var(--tx)' }}>RockMount</h1>
              <p style={{ fontSize: 11, color: 'var(--tx3)', margin: 0, marginTop: 2 }}>Voice Engine</p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsBatchMode(!isBatchMode)
              setBatchResults([])
            }}
            disabled={isLoading}
            className="btn-hover"
            style={{
              padding: '8px 16px',
              background: isBatchMode ? 'linear-gradient(135deg, var(--p), var(--sec))' : 'var(--sur2)',
              color: isBatchMode ? 'white' : 'var(--tx)',
              border: 'none',
              borderRadius: 'var(--r3)',
              fontWeight: 600,
              cursor: isLoading ? 'not-allowed' : 'pointer',
              fontSize: 13,
              opacity: isLoading ? 0.6 : 1,
            }}
          >
            {isBatchMode ? '📁 Batch' : '📄 Single'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main style={{ flex: 1, marginTop: 'var(--th)', width: '100%' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '60px 40px' }}>
          {/* Hero Section */}
          <div style={{ marginBottom: '60px', textAlign: 'center', animation: 'fadeIn 0.7s var(--ease)' }}>
            <h1 style={{ fontSize: 40, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '16px', background: 'linear-gradient(135deg, var(--tx) 0%, var(--tx2) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              {isBatchMode ? 'Batch Transcribe' : 'Transcribe Audio'}
            </h1>
            <p style={{ fontSize: 18, color: 'var(--tx2)', marginBottom: 0, maxWidth: '600px', margin: '0 auto' }}>
              {isBatchMode ? 'Upload multiple files to transcribe them all at once with lightning speed' : 'Convert your audio files to accurate text in seconds'}
            </p>
          </div>

          {/* Upload Zone */}
          <div style={{ marginBottom: '60px', animation: 'fadeIn 0.8s var(--ease)' }}>
            <UploadZone
              onUpload={async (file: File) => {
                if (isBatchMode) {
                  await handleBatchUpload([file])
                } else {
                  await handleUpload(file)
                }
              }}
              isLoading={isLoading}
              isBatchMode={isBatchMode}
            />
          </div>

          {/* Stats */}
          {history.length > 0 && !isLoading && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '60px', animation: 'fadeIn 0.9s var(--ease)' }}>
              <div style={{ padding: '20px', background: 'var(--sur)', borderRadius: 'var(--r4)', border: '1.5px solid var(--bd)', textAlign: 'center', transition: 'all var(--dur)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = 'var(--sh-glow)'
                  e.currentTarget.style.transform = 'translateY(-4px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'var(--sh1)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>📊</div>
                <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--p)', marginBottom: 4 }}>{history.length}</div>
                <div style={{ fontSize: 12, color: 'var(--tx3)' }}>Transcriptions</div>
              </div>
              <div style={{ padding: '20px', background: 'var(--sur)', borderRadius: 'var(--r4)', border: '1.5px solid var(--bd)', textAlign: 'center', transition: 'all var(--dur)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = 'var(--sh-glow)'
                  e.currentTarget.style.transform = 'translateY(-4px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'var(--sh1)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>📝</div>
                <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--sec)', marginBottom: 4 }}>{history.reduce((sum, h) => sum + h.wordCount, 0).toLocaleString()}</div>
                <div style={{ fontSize: 12, color: 'var(--tx3)' }}>Total Words</div>
              </div>
              <div style={{ padding: '20px', background: 'var(--sur)', borderRadius: 'var(--r4)', border: '1.5px solid var(--bd)', textAlign: 'center', transition: 'all var(--dur)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = 'var(--sh-glow)'
                  e.currentTarget.style.transform = 'translateY(-4px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'var(--sh1)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>⏱️</div>
                <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--acc)', marginBottom: 4 }}>{Math.floor(history.reduce((sum, h) => sum + h.durationSec, 0) / 60)}m</div>
                <div style={{ fontSize: 12, color: 'var(--tx3)' }}>Total Duration</div>
              </div>
            </div>
          )}

          {/* Current Result */}
          {currentResult && !isBatchMode && (
            <div style={{ marginBottom: '60px', animation: 'fadeIn 1s var(--ease)' }}>
              <TranscriptionResult
                text={currentResult.text}
                filename={currentResult.filename}
                wordCount={currentResult.wordCount}
                durationSec={currentResult.durationSec}
                model={currentResult.model}
              />
            </div>
          )}

          {/* Batch Results */}
          {isBatchMode && batchResults.length > 0 && (
            <div style={{ marginBottom: '60px', animation: 'fadeIn 1s var(--ease)' }}>
              <div style={{ padding: '28px', background: 'linear-gradient(135deg, var(--ps) 0%, var(--sec-s) 100%)', borderRadius: 'var(--r4)', border: '1.5px solid var(--bd)' }}>
                <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: '20px', color: 'var(--p)' }}>
                  ✅ Batch Complete ({batchResults.length} files)
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '16px', maxHeight: '400px', overflowY: 'auto', paddingRight: '12px' }}>
                  {batchResults.map((record, idx) => (
                    <div
                      key={record.id}
                      onClick={() => setCurrentResult(record)}
                      style={{
                        padding: '16px',
                        background: 'var(--sur)',
                        borderRadius: 'var(--r3)',
                        cursor: 'pointer',
                        transition: 'all var(--dur)',
                        border: '1px solid var(--bd)',
                        animation: `fadeIn 0.5s var(--ease) ${idx * 50}ms both`,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = 'var(--sh-glow)'
                        e.currentTarget.style.transform = 'translateY(-2px)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = 'var(--sh1)'
                        e.currentTarget.style.transform = 'translateY(0)'
                      }}
                    >
                      <div style={{ fontWeight: 600, color: 'var(--tx)', marginBottom: 8 }}>📄 {record.filename}</div>
                      <div style={{ fontSize: 13, color: 'var(--tx2)' }}>
                        <div>{record.wordCount} words</div>
                        <div>{record.durationSec}s duration</div>
                      </div>
                      <div style={{ marginTop: 8, fontSize: 20 }}>✨</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* History */}
          {!isLoading && !isBatchMode && (
            <div style={{ animation: 'fadeIn 1.1s var(--ease)' }}>
              <HistoryList
                records={history}
                onSelectRecord={setCurrentResult}
                onClearHistory={async () => {
                  if (confirm('Clear all history?')) {
                    try {
                      await fetch('/api/history', { method: 'DELETE' })
                      setHistory([])
                      setCurrentResult(null)
                    } catch (error) {
                      console.error('Failed to clear history:', error)
                    }
                  }
                }}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
