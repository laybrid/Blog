/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    colors: {
      'color-text': '#bbb',
      'color-text-d': '#ddd',
      'color-text-r': '#fff',
      'color-bg': '#020618',
      'color-theme':'#ffcd32',
      'color-theme-d': 'rgba(255, 205, 49, 0.5)'
    },
    extend: {}
  },
  plugins: []
}
