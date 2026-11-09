/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ritm: {
          dark: '#0B0C10',
          card: '#14161D',
          elevated: '#1A1D27',
          surface: '#1F222E',
          red: '#EF233C',
          brightRed: '#FF2A4B',
          glowRed: 'rgba(239, 35, 60, 0.45)',
          muted: '#8E95A5',
          border: 'rgba(255, 255, 255, 0.08)',
        },
        status: {
          cancel: '#FB7185',
          cancelBg: 'rgba(225, 29, 72, 0.18)',
          cancelBorder: 'rgba(225, 29, 72, 0.35)',
          ok: '#34D399',
          okBg: 'rgba(16, 185, 129, 0.18)',
          okBorder: 'rgba(16, 185, 129, 0.35)',
          deadline: '#FBBF24',
          deadlineBg: 'rgba(245, 158, 11, 0.22)',
          deadlineBorder: 'rgba(245, 158, 11, 0.4)',
        },
        attend: {
          present: '#059669',
          presentHover: '#10B981',
          late: '#B45309',
          lateHover: '#D97706',
          excuse: '#4F46E5',
          excuseHover: '#6366F1',
          absent: '#B91C1C',
          absentHover: '#DC2626',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Unbounded', 'Montserrat', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 20px rgba(239, 35, 60, 0.35)',
        card: '0 8px 32px -4px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
};
