/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
          'primary': '#06a7f4',
          'secondary': '#23ce90',
          'basic': '#013e75',
      }
  },
  },
  plugins: [],
}

