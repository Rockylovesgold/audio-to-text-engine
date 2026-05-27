import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      dark: {
        50: '#f0f0f5',
        100: '#e6e6f0',
        200: '#d0d0e0',
        300: '#b0b0d0',
        400: '#8080b0',
        500: '#6b6b80',
        600: '#5a5a70',
        700: '#3a3a50',
        800: '#1f1f2e',
        900: '#111118',
        950: '#0a0a0f',
      },
      gold: {
        400: '#f5b741',
        500: '#f5a623',
        600: '#d68616',
      },
      white: '#ffffff',
      black: '#000000',
      green: {
        500: '#10b981',
      },
      red: {
        500: '#ef4444',
      },
      yellow: {
        400: '#facc15',
      },
    },
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
    },
  },
  plugins: [],
} satisfies Config
