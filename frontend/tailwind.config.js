module.exports = {
  // mode: "jit",
  purge: [
    "./components/**/*.js",
    "./components/**/*.tsx",
    "./pages/**/*.js",
    "./pages/**/*.tsx",
  ],
  variants: {
    extend: {
      opacity: ["disabled"],
    },
  },
  theme: {
    extend: {
      colors: {
        "accent-1": "#FAFAFA",
        "accent-2": "#EAEAEA",
        "accent-7": "#333",
        success: "#0070f3",
        cyan: "#79FFE1",
        primary: "rgba(29,29,29,0.95)",
        secondary: "#ffffffe8",
      },
      spacing: {
        28: "7rem",
      },
      zIndex: {
        "-10": "-10",
      },
      letterSpacing: {
        tighter: "-.04em",
      },
      lineHeight: {
        tight: 1.2,
      },
      minWidth: {
        sm: "24rem",
      },
      fontFamily: {
        heading: ["Adamina", "serif"],
        serif: "Adamina, serif",
      },
      fontSize: {
        "5xl": "2.5rem",
        "6xl": "2.75rem",
        "7xl": "4.5rem",
        "8xl": "6.25rem",
      },
      boxShadow: {
        small: "0 5px 10px rgba(0, 0, 0, 0.12)",
        medium: "0 8px 30px rgba(0, 0, 0, 0.12)",
      },
    },
  },
};
