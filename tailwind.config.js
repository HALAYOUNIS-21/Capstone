/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Add content paths
  theme: {
    extend: {
      fontFamily: {
        Handjet: ["Handjet", "sans-serif"],
        Alexandria: ["Alexandria", "sans-serif"],
      },
      colors: {
        orangeMain: "#FF7E52",
        orangeDark: "#EA580C",
        pinkLight: "#F5EAFE",
      },
    },
  },
  plugins: [],
};