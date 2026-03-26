/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    colors: {
      'color-text': '#90a1b9',
      'color-text-d': '#e2e8f0',
      'color-text-r': '#fff',
      'color-border': '#314158',
      'color-border-bg': '#0f172b',
      'color-bg': '#020618',
      'color-theme':'#ffcd32',
      'color-theme-d': 'rgba(255, 205, 49, 0.5)'
    },
    extend: {}
  },
  plugins: []
}
