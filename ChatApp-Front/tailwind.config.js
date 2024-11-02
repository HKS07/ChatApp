/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customGray: '#222E35',
        customLightGray: '#202C33',
        customBlack: '#111B21',
        customDarkWhite: '#8696A0',
        customLightWhite: '#E9EDEF',
        customGreen: '#025144'
      }
    },
  },
  plugins: [],
}