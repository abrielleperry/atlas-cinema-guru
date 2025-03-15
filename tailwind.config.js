/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        navyBlue: "#00003c",
        atlasTeal: "#1DD2AF",
        accentBlue: "#000061",
        accentTeal: "#54F4D0",
      },
    },
  },
  plugins: [],
};
