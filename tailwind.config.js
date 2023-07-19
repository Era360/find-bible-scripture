/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      azure: {
        50: "#f4f7fb",
        100: "#e7eef7",
        200: "#cadbed",
        300: "#9cbedd",
        400: "#679bc9",
        500: "#447fb3",
        600: "#336699",
        700: "#2a517a",
        800: "#264666",
        900: "#243c56",
        950: "#182739",
      },
    },
  },
  plugins: [],
};
