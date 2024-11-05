/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        backgroundColor: "#fff4ea",
        buttonColor: "#c96868",
        accentColorLightCream: "#FFF7F0",
        subtleSoftGrey: "#B0AFAF",
        mutedOchre: "#FF8B42",
        softOrange: "#FFA559",
        pastelYellow: "#FDDBBB",
        pastelOrange: "#FFB38E",
        pastelWhite: "#f8edeb",
        pastelRed: "#ffadad",
        realRed: "#e15050",
        pastelPink: "#ff9b9a",
        pastelBlue: "#9eb3c2",
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
        breatheGlow: "breatheGlow 10s ease-in-out infinite",
      },
      keyframes: {
        breatheGlow: {
          "0%, 100%": { boxShadow: "0 0 5px 0 rgba(201, 104, 104, 0.3)" },
          "50%": { boxShadow: "0 0 20px 10px rgba(201, 104, 104, 0.7)" },
        },
      },
    },
  },
  plugins: [],
};
