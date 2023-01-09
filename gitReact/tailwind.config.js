/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      textColor: ['active'],
      height: {
        35: '33rem',
        80: "80%",
        90: "90%",
        100: "100vh"
      },

    },
    container: {
      center: true,
    },
  },
  variants: {
    extend: {
      textColor: ['active'],
    }
  },
  plugins: [],
}
