/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        backgroundColor: "#FFE5D9",
        buttonColor: "#D95333",
        accentColorLightCream: "#FFF7F0",
        subtleSoftGrey: "#B0AFAF",
        mutedOchre: "#FF8B42",
        softOrange: "#FFA559",
        gray: {
          darkest: "#1f2d3d",
          dark: "#3c4858",
          DEFAULT: "#c0ccda",
          light: "#e0e6ed",
          lightest: "#f9fafc",
        },
      },
      animation: {
        spinSlow: "spin 1s ease-in-out",
      },
    },
  },
  plugins: [],
};
