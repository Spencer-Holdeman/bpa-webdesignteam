/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './website/templates/*.html',
  ],
  theme: {
    extend: {
      colors: {
        'purple-light': {'raw': '#d5c2f0'},
        'purple-dark': {'raw': '#1e0b38'},
        'purple-darker': {'raw': '#0f0221'},
        'purple-darkest': {'raw': '#0f0221'},
      },
      screens: {
        'smh': {'raw': '(min-height: 600px)'}, 
        'mdh': {'raw': '(min-height: 800px)'},
      },
      fontFamily: {
        'sourgummy': ['Sour Gummy', 'sans-serif'],
        'lacquer': ['Lacquer', 'sans-serif'],
      },
      backgroundImage: {
        'crossed': "url(../img/background/group.webp)"
      }
    },
  },
  plugins: [],
}

