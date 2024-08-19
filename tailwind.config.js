/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./pages/**/*.{html,ts}",
    "./components/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      textColor:{
        primary: '#45bcb5',
        danger: '#F00'
      }
    },
  },
  plugins: [],
}

