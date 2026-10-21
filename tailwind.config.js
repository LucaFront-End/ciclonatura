/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ciclo: {
          lime: "#84cc16",
          "lime-dark": "#65a30d",
          "lime-light": "#d9f99d",
          dark: "#0f172a",
          navy: "#0a192f",
          blue: "#0284c7"
        }
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        mono: ['monospace']
      }
    },
  },
  plugins: [],
}
