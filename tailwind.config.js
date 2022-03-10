module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        White: "#FFFFFF",
        Black: "#490101",
        BoundaryBlack: "#000000",
        BoundaryWhite: "#BBBBBB",
        WhiteGray: "#DEDEDE",
        Primary: "#FF5C5C",
        Secondary: "#FFA500",
        Tertiary: "#BC7202",
        Success: "#008000",
        Danger: "#8F00FF",
        Warning: "#FFFF00",
        Gray: "#845252",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
