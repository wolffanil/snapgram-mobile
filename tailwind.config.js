/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      backgroundColor: {
        "main-color": "#877EFF dark:#685DFF",
      },
      colors: {
        "primary-500": "#877EFF",
        "primary-600": "#5D5FEF",
        "secondary-500": "#FFB620",
        "off-white": "#D0DFFF",
        red: "#FF5A5A",
        "dark-1": "#000000",
        "dark-2": "#09090A",
        "dark-3": "#101012",
        "dark-4": "#1F1F22",
        "dark-5": "#0D0D0D",
        "dark-6": "#1C1C1F",
        "light-1": "#FFFFFF",
        "light-2": "#E8E8E8",
        "light-3": "#7878A3",
        "light-4": "#5C5C7B",
        "light-5": "#F6F6F6",
      },
    },
  },
  plugins: [],
};
