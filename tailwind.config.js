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
        brand: {
          DEFAULT: "#AFF94F",
          lime: "#AFF94F",
          dark: "#0f172a",
          glow: "rgba(175, 249, 79, 0.4)",
          light: "#f0fee2"
        },
        ciclo: {
          lime: "#AFF94F",
          "lime-dark": "#8ee92c",
          "lime-light": "#f0fee2",
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
