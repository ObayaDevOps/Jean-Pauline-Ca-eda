/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        /* --- Neutrals --- */
        "neutral-black-02": "#FAFAFA",
        "neutral-black-05": "#EFF2F4",
        "neutral-black-10": "#E9ECEF",
        "neutral-black-20": "#DDE0E3",
        "neutral-black-40": "#C4C8CD",
        "neutral-black-60": "#9398A0",
        "neutral-black-80": "#626773",
        "neutral-black-100": "#313746",

        /* --- Primary --- */
        "primary-blue-100": "#3477FF",
        "primary-blue-80": "#5C93FF",
        "primary-blue-60": "#85AEFF",
        "primary-blue-40": "#AEC9FF",
        "primary-blue-20": "#D6E4FF",
        "primary-blue-10": "#F5F8FE",
        "primary-aqua-100": "#12E6D4",
        "primary-dark-100": "#000E33",

        /* --- Secondary --- */
        "secondary-green-100": "#17E589",
        "secondary-green-50": "#8BF2C4",
        "secondary-yellow-100": "#FFE566",
        "secondary-yellow-50": "#FFF2B3",
        "secondary-orange-100": "#FF8040",
        "secondary-orange-50": "#FFBF9F",
        "secondary-red-100": "#F2556F",
        "secondary-red-50": "#F9AAB7",

        /* --- Extended --- */
        "extended-yellow-120": "#FAD400",
        "extended-blue-150": "#0A2E77",

      },
      fontFamily: {
        sans: ["var(--font-avenir)"],
      },
      textShadow: {
        dashboard: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    plugin(({ addUtilities }) => {
      addUtilities({
        ".scrollbar": {
          "&::-webkit-scrollbar": {
            "border-radius": "100vh",
            width: "10px",
          },
        },
        ".scrollbar::-webkit-scrollbar-thumb": {
          background: "#eee",
          "border-radius": "100vh",
        },
      });
    }),
  ],
};
