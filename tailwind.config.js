module.exports = {
  mode: "jit",
  purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        White: "#FFFFFF",
        Black: "#333",
        BoundaryBlack: "#000000",
        BoundaryWhite: "#BBBBBB",
        WhiteGray: "#ffc0cb",
        Primary: "#ffc2eb",
        Secondary: "#f8ccc8",
        Tertiary: "#ffe4e1",
        Success: "#008000",
        Danger: "#8F00FF",
        Warning: "#FFFF00",
        Gray: "#fff2f0",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
