// tailwind.config.js
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#150485',
        secondary: '#590995',
        red: '#C62A88',
        green: '#03C4A1',
        darkModeBlack: '#202020',
        darkModeText: 'rgba(255,255,255,0.92)',
        darkModePrimary: 'rgba(21, 40, 203, 1)'
      },
      padding: {

        cs: '5.5rem',
        34: '8.5rem',
        n2: '-4rem'
      },
      margin: {
        120: '-50rem'
      }
    },
  },
  variants: {
    extend: {

    },
  },
  plugins: [],
}