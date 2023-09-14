/** @type {import('tailwindcss').Config} */

export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        backgroundImage: {
          "home-bkg": "url('./src/public/assets/homeBkg.png')",
          "list-bkg": "url('./src/public/assets/listBkg.png')",
          "game-bkg": "url('./src/public/assets/gameBkg.png')"

        }
      },
    },
    plugins: [],
  }