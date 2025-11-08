/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1976d2",
        secondary: "#424242",
        accent: "#f50057",
        background: "#f7eaee",
      },
    },
  },
  plugins: [],
}
