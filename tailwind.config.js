// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#4F46E5", // Indigo
          light: "#6366F1",
          dark: "#4338CA",
        },
      },
    },
  },
  plugins: [],
};
