/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: "#121212",
        darkCard: "#2A2A3D",
        darkTextPrimary: "#E5E7EB",
        darkTextSecondary: "#9CA3AF",
        darkBlue: "#3B82F6",
        darkGreen: "#10B981",
        darkYellow: "#FBBF24",
        darkRed: "#EF4444",
      },
    },
  },
  plugins: [],
};
