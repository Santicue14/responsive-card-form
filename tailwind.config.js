/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        White: "hsl(0, 0%, 100%)",
        Lightgrayishviolet: "hsl(270, 3%, 87%)",
        Darkgrayishviolet: "hsl(279, 6%, 55%)",
        Verydarkviolet: "hsl(278, 68%, 11%)"
      },
    },
  },
  plugins: [],
}

