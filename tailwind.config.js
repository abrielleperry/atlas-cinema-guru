/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        neulis: ['"neulis-sans"', "sans-serif"],
      },
      colors: {
        navyBlue: "#00003c",
        atlasTeal: "#54F4D0",
      },
    },
  },
  plugins: [],
};
