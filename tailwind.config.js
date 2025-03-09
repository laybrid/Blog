/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    colors: {
      'color-theme': '#ffcd32',
      'color-theme-d': 'rgba(255, 205, 49, 0.5)',
      'color-text': '#fff',
      'color-text-d': 'rgba(255, 255, 255, 0.3)',
      'color-text-l': ' rgba(255, 255, 255, 0.5)',
      'color-text-ll': ' rgba(255, 255, 255, 0.8)'
    },
    extend: {},
  },
  plugins: [],
}

