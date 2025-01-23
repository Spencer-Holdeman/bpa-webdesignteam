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
        'dark': {'raw': '#121117'},
      },
      screens: {
        'smh': {'raw': '(min-height: 600px)'}, 
        'mdh': {'raw': '(min-height: 800px)'},
        'mxl': {'raw': '(max-height: 1280px)'},
      },
      fontFamily: {
        'sourgummy': ['Sour Gummy', 'sans-serif'],
        'lacquer': ['Lacquer', 'sans-serif'],
        'marker': ['Permanent Marker', 'sans-serif'],
        'rowdies': ['Rowdies', 'sans-serif'],
      },
      backgroundImage: {
        'skatepark': "url(../img/background/group.webp)"
      }
    }
  },
  plugins: [],
}

