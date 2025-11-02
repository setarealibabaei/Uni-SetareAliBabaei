/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["peyda", ...defaultTheme.fontFamily.sans],
        IRANSans: ["IRANSans", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        text: {
          DEFAULT: "#494751", 
          light: "#FFFFFF", 
          boldtext: "#E3AACA", 
          hover: "#E3AACA", 
          active: "#C839EC", 
        },
        border: "#D9D9D9", 
        accent: {
          DEFAULT: "#E51F8E", 
        },
        layout: {
          header: "#FFFCF9",
          sidebar: "#EADEDE",
          footer: "#EADEDE",
          background: "#FFFCF9",
        },
      },
    },
  },
  plugins: [],
};
