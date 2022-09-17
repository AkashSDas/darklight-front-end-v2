/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: "#4B6BDC",
        blue: "#0D99FF",
        red: "#EC4040",
        green: "#91E43D",
        black: "#131313",
        greystone: "#3C3C3C",
        grey: "#8A8F99",
        clay: "#DCDEE3",
        smoke: "#F5F5F5",
        snow: "#FAFAFA",
        white: "#FCFCFC",
      },
      fontFamily: {
        gtwalsheim: ["GTWalsheimPro", "system-ui", "sans-serif"],
      },
      boxShadow: {
        sm: "0px 3px 8px 0px rgba(100, 100, 111, 0.2)",
        md: "0px 5px 12px 0px rgba(100, 100, 111, 0.2)",
        lg: "0px 7px 29px 0px rgba(100, 100, 111, 0.2)",
      },
      fontSize: {
        // Desktop
        "d-h1": "48.83px",
        "d-h2": "39.06px",
        "d-h3": "31.25px",
        "d-h4": "25.00px",
        "d-h5": "20.00px",
        "d-body": "16.00px",
        "d-cap": "12.80px",
        "d-sm": "10.24px",

        // Tablet
        "t-h1": "36.62px",
        "t-h2": "29.30px",
        "t-h3": "23.44px",
        "t-h4": "18.75px",
        "t-h5": "18.75px",
        "t-body": "15.00px",
        "t-cap": "12.00px",
        "t-sm": "9.60px",

        // Mobile
        "m-h1": "30.52px",
        "m-h2": "24.41px",
        "m-h3": "19.53px",
        "m-h4": "19.53px",
        "m-h5": "15.63px	",
        "m-body": "12.50px",
        "m-cap": "10.00px",
        "m-sm": "8.00px",
      },
      keyframes: {
        "long-icon-btn": {
          "0%, 100%": {
            "padding-inline": "24px",
          },
          "50%": {
            "padding-inline": "30px",
          },
        },
        "google-btn": {
          "0%, 100%": {
            "padding-inline": "2px",
            height: "44px",
          },
          "50%": {
            "padding-inline": "6px",
            height: "44px",
          },
        },
        "google-icon": {
          "0%, 100%": {
            "padding-inline": "8px",
          },
          "50%": {
            "padding-inline": "12px",
          },
        },
      },
      animation: {
        "long-icon-btn":
          "long-icon-btn 300ms cubic-bezier(0.445, 0.05, 0.55, 0.95)",
        "google-btn": "google-btn 300ms cubic-bezier(0.445, 0.05, 0.55, 0.95)",
        "google-icon":
          "google-icon 360ms cubic-bezier(0.445, 0.05, 0.55, 0.95)",
      },
    },
  },
  plugins: [],
};
