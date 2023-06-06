/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7AB5DC',
        primaryLight: '#A7D1E8',
        secondary: '#252829',
      },
      animation: {
        handwriting: 'handwriting 4s linear',
        'show-up-left': 'show-up-left 0.5s ease-in-out both',
        'show-up-right': 'show-up-right 0.5s ease-in-out both',
      },
      keyframes: {
        handwriting: {
          '0%': { strokeDashoffset: 4674 },
          '100%': { strokeDashoffset: 0 },
        },
        'show-up-left': {
          '0%': {
            transform: 'translateX(-100%)',
            opacity: 0,
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: 1,
          },
        },
        'show-up-right': {
          '0%': {
            transform: 'translateX(100%)',
            opacity: 0,
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: 1,
          },
        },
      },
    },
  },
  plugins: [],
};
