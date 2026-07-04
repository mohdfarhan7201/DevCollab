/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",

  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],

  theme: {
    extend: {

      colors: {

        primary: "#3B82F6",

        secondary: "#8B5CF6",

        success: "#22C55E",

        danger: "#EF4444",

        warning: "#F59E0B",

        dark: "#0B1120",

      },

      fontFamily: {

        sans: ["Inter", "sans-serif"],

        heading: ["Poppins", "sans-serif"],

      },

    },
  },

  plugins: [],
};