/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: 'Rubik'
      },
      colors: {
        moderateBlue: '#5457b6',
        softRed: '#ed6468',
        lightGrayishBlue: '#c3c4ef',
        paleRed: '#ffb8bb',
        darkBlue: '#324152',
        grayishBlue: '#67727e',
        lightGray: '#eaecf1',
        veryLightGray: '#f5f6fa'
      }
    },
  },
  plugins: [],
}
