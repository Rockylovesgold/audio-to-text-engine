'use client'

interface ProgressBarProps {
  isVisible: boolean
  progress: number
  message?: string
}

export default function ProgressBar({ isVisible, progress, message }: ProgressBarProps) {
  if (!isVisible) return null

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Backdrop */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }} />

      {/* Progress Card */}
      <div style={{
        position: 'relative',
        background: 'var(--sur)',
        borderRadius: 'var(--r5)',
        padding: '32px 40px',
        maxWidth: 420,
        boxShadow: 'var(--sh3)',
        border: '1.5px solid var(--bd)',
      }}>
        {/* Icon Animation */}
        <div style={{
          textAlign: 'center',
          marginBottom: 24,
          fontSize: 48,
          animation: 'bounce 1s ease-in-out infinite',
        }}>
          🎙️
        </div>

        {/* Message */}
        <h3 style={{
          fontSize: 16,
          fontWeight: 600,
          textAlign: 'center',
          marginBottom: 8,
          color: 'var(--tx)',
        }}>
          {message || 'Processing...'}
        </h3>

        {/* Progress bar */}
        <div style={{
          width: '100%',
          height: 6,
          background: 'var(--bd)',
          borderRadius: 'var(--pill)',
          overflow: 'hidden',
          marginBottom: 16,
          boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)',
        }}>
          <div
            style={{
              height: '100%',
              background: `linear-gradient(90deg, var(--p), var(--sec))`,
              borderRadius: 'var(--pill)',
              width: `${progress}%`,
              transition: 'width 0.4s cubic-bezier(0.16,1,0.3,1)',
              boxShadow: `0 0 16px rgba(37,99,235,0.4)`,
            }}
          />
        </div>

        {/* Percentage */}
        <div style={{
          textAlign: 'center',
          fontSize: 13,
          color: 'var(--tx3)',
          fontWeight: 500,
        }}>
          {progress}%
        </div>

        {/* Dot animation */}
        <style>{`
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
          @keyframes pulse-dots {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}</style>
      </div>
    </div>
  )
}
