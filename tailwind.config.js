/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5932EA',
        secondary: '#FFC5C5',
        'secondary-light': '#ffdfdf',
        danger: '#DF0404'
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

