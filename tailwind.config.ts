import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html", 
    "./src/**/*.{js,ts,jsx,tsx}", // Scan all JS/TS/JSX/TSX files in src directory
    "./public/**/*.{html,js}", // Include public files if applicable
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E40AF", // Custom primary color
        secondary: "#9333EA", // Custom secondary color
        accent: "#F59E0B", // Accent color
      },
      spacing: {
        "128": "32rem", // Custom spacing
        "144": "36rem",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Custom sans-serif font
        mono: ["Fira Code", "monospace"], // Custom monospace font
      },
      boxShadow: {
        "3xl": "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)", // Custom shadow
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"), // Tailwind plugin for form styling
    require("@tailwindcss/typography"), // Tailwind plugin for typography
    require("@tailwindcss/aspect-ratio"), // Tailwind plugin for aspect ratios
  ],
};

export default config;