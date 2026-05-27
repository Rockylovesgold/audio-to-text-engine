'use client'

import { useState } from 'react'
import Link from 'next/link'

interface DashboardLayoutProps {
  children: React.ReactNode
  currentScreen: string
  onNavigate: (screen: string) => void
  darkMode: boolean
  onToggleDarkMode: () => void
}

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'upload', label: 'Upload', icon: '⬆️' },
  { id: 'files', label: 'Transcripts', icon: '📄' },
]

const NAV_BOTTOM = [
  { id: 'settings', label: 'Settings', icon: '⚙️' },
  { id: 'help', label: 'Help', icon: '❓' },
]

export default function DashboardLayout({
  children,
  currentScreen,
  onNavigate,
  darkMode,
  onToggleDarkMode,
}: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div style={{ display: 'flex', height: '100vh', background: 'var(--bg)' }}>
      {/* Sidebar */}
      <aside
        style={{
          width: sidebarCollapsed ? 64 : 240,
          flexShrink: 0,
          height: '100%',
          background: 'var(--sur)',
          borderRight: '1.5px solid var(--bd)',
          display: 'flex',
          flexDirection: 'column',
          transition: 'width 0.25s var(--ease)',
          overflow: 'hidden',
        }}
      >
        {/* Logo */}
        <div
          style={{
            padding: sidebarCollapsed ? '18px 0' : '18px 16px',
            borderBottom: '1.5px solid var(--bd)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: sidebarCollapsed ? 'center' : 'space-between',
            gap: 8,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: 'var(--p)',
            }}
          >
            {sidebarCollapsed ? '⚡' : '⚡ RockMount'}
          </div>
          {!sidebarCollapsed && (
            <button
              onClick={() => setSidebarCollapsed(true)}
              style={{
                width: 26,
                height: 26,
                borderRadius: 'var(--r2)',
                background: 'var(--sur2)',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--tx3)',
              }}
            >
              ←
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav
          style={{
            flex: 1,
            padding: '10px 10px',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            overflowY: 'auto',
          }}
        >
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                width: '100%',
                padding: sidebarCollapsed ? '10px 0' : '9px 12px',
                justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                borderRadius: 'var(--r3)',
                border: 'none',
                cursor: 'pointer',
                background:
                  currentScreen === item.id
                    ? 'var(--ps)'
                    : 'transparent',
                color:
                  currentScreen === item.id
                    ? 'var(--p)'
                    : 'var(--tx2)',
                transition: 'all var(--dur) var(--ease)',
                fontFamily: 'var(--font)',
                fontSize: 14,
                fontWeight: currentScreen === item.id ? 600 : 500,
              }}
              title={sidebarCollapsed ? item.label : undefined}
            >
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              {!sidebarCollapsed && item.label}
            </button>
          ))}
        </nav>

        {/* Bottom Navigation */}
        <div
          style={{
            padding: '10px 10px',
            borderTop: '1.5px solid var(--bd)',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          {NAV_BOTTOM.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                width: '100%',
                padding: sidebarCollapsed ? '10px 0' : '9px 12px',
                justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                borderRadius: 'var(--r3)',
                border: 'none',
                cursor: 'pointer',
                background:
                  currentScreen === item.id
                    ? 'var(--ps)'
                    : 'transparent',
                color:
                  currentScreen === item.id
                    ? 'var(--p)'
                    : 'var(--tx2)',
                transition: 'all var(--dur) var(--ease)',
                fontFamily: 'var(--font)',
                fontSize: 14,
                fontWeight: currentScreen === item.id ? 600 : 500,
              }}
              title={sidebarCollapsed ? item.label : undefined}
            >
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              {!sidebarCollapsed && item.label}
            </button>
          ))}

          {/* User Profile */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 9,
              padding: sidebarCollapsed ? '8px 0' : '8px 10px',
              borderRadius: 'var(--r3)',
              justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
              marginTop: 4,
              cursor: 'pointer',
              transition: 'background var(--dur)',
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--p), var(--sec))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: 12,
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              R
            </div>
            {!sidebarCollapsed && (
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: 'var(--tx)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Rocky
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: 'var(--tx3)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  User
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Top Bar */}
        <header
          style={{
            height: 'var(--th)',
            flexShrink: 0,
            borderBottom: '1.5px solid var(--bd)',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            padding: '0 20px',
            background: 'var(--sur)',
          }}
        >
          {sidebarCollapsed && (
            <button
              onClick={() => setSidebarCollapsed(false)}
              style={{
                width: 30,
                height: 30,
                borderRadius: 'var(--r2)',
                background: 'var(--sur2)',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--tx3)',
              }}
            >
              →
            </button>
          )}

          <div style={{ flex: 1 }}></div>

          <button
            onClick={onToggleDarkMode}
            style={{
              width: 36,
              height: 36,
              borderRadius: 'var(--r3)',
              background: 'var(--sur2)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--tx2)',
              fontSize: 16,
            }}
            title={darkMode ? 'Light mode' : 'Dark mode'}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </header>

        {/* Content Area */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            background: 'var(--bg)',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
