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
        'change-font-family': 'change-font-family 0.7s ease-in-out both 3',
        'show-up-left': 'show-up-left 0.5s ease-in-out both',
      },
      keyframes: {
        handwriting: {
          '0%': { strokeDashoffset: 4674 },
          '100%': { strokeDashoffset: 0 },
        },
        'change-font-family': {
          '0%': {
            fontFamily: ['var(--font-inter)'],
          },
          '20%': {
            fontFamily: ['var(--font-advent-pro)'],
          },
          '30%': {
            fontFamily: ['var(--font-merienda)'],
          },
          '40%': {
            fontFamily: ['var(--font-glory)'],
          },
          '50%': {
            fontFamily: ['var(--font-raleway-dots)'],
          },
          '60%': {
            fontFamily: ['var(--font-arima)'],
          },
          '80%': {
            fontFamily: ['var(--font-grenze-gotisch)'],
          },
          '100%': {
            fontFamily: ['var(--font-inter)'],
          },
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
      },
    },
  },
  plugins: [],
};
