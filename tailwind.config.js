/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // for React projects
    "./public/index.html"          // if using plain HTML
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
