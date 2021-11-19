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
        green: '#03C4A1'
      },
      padding: {
       
        cs:'5.5rem'
       }
    },
  },
  variants: {
    extend: {

    },
  },
  plugins: [],
}