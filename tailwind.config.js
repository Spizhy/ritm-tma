/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ritm: {
          dark: '#0B0C10',
          card: '#13151B',
          elevated: '#1A1D27',
          surface: '#1F222E',
          red: '#EF233C',
          brightRed: '#FF2A4B',
          glowRed: 'rgba(239, 35, 60, 0.45)',
          muted: '#8E95A5',
          border: 'rgba(255, 255, 255, 0.08)',
        },
        status: {
          cancel: '#EF233C',
          cancelBg: '#351219',
          cancelBorder: 'rgba(239, 35, 60, 0.5)',
          ok: '#10B981',
          okBg: '#093325',
          okBorder: 'rgba(16, 185, 129, 0.5)',
          deadline: '#F59E0B',
          deadlineBg: '#38200B',
          deadlineBorder: 'rgba(245, 158, 11, 0.5)',
        },
        attend: {
          present: '#059669',
          presentHover: '#10B981',
          late: '#B45309',
          lateHover: '#D97706',
          excuse: '#4F46E5',
          excuseHover: '#6366F1',
          absent: '#DC2626',
          absentHover: '#EF4444',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        brand: ['NauryzRedKeds', 'Unbounded', 'sans-serif'],
        display: ['NauryzRedKeds', 'Unbounded', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 20px rgba(239, 35, 60, 0.35)',
        card: '0 10px 35px -4px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
};
