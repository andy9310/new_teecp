/** @type {import('tailwindcss').Config} */
const {nextui} = require("@nextui-org/react");
module.exports = {
  content: [
    "./public/**/*.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
          'primary': '#007bff',
          'secondary': '#333',
          'basic': '#013e75',
          'warning':'#C2410C'
      },
      width: {
        table: '300px',  // Custom width class
        custom:'600px'
      }
  },
  },
  darkMode: "class",
  plugins: [nextui()],
}

