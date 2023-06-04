/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        handwriting: 'handwriting 2s linear',
      },
      keyframes: {
        handwriting: {
          '0%': { strokeDashoffset: 1071 },
          '100%': { strokeDashoffset: 0 },
        },
      },
    },
  },
  plugins: [],
};
