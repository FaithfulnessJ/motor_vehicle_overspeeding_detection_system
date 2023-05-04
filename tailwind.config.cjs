/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '250px',
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        primary_color: "#2F2A5E",
        secondary_color: "#1771EB",
        primary_green: "#29FF7B",
        primary_yellow: "#FFFA5C",
        primary_green_light: "#BBFCD4",
        primary_yellow_light: "#FAFFC2",
      },
    },
  },
  plugins: [],
}
