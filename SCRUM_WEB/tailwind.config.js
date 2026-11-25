/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      keyframes: {
        'toast-in': {
          '0%': { opacity: '0', transform: 'translateY(-10px) scale(0.96)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'shrink-bar': {
          '0%': { width: '100%' },
          '100%': { width: '0%' },
        },
      },
      animation: {
        'toast-in': 'toast-in 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'shrink-bar': 'shrink-bar linear forwards',
      },
    },
  },
  plugins: [],
};
