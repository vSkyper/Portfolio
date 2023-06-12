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
        'custom-cursor': 'custom-cursor 0.5s ease-in-out both',
        'custom-cursor-out': 'custom-cursor-out 0.2s ease-in-out both',
      },
      keyframes: {
        handwriting: {
          '0%': { strokeDashoffset: 4674 },
          '100%': { strokeDashoffset: 0 },
        },
        'custom-cursor': {
          '0%': {
            scale: 0,
            opacity: 0,
          },
          '100%': {
            scale: 1,
            opacity: 1,
          },
        },
        'custom-cursor-out': {
          '0%': {
            scale: 1,
            opacity: 1,
          },
          '100%': {
            scale: 0,
            opacity: 0,
          },
        },
      },
    },
  },
  plugins: [],
};
