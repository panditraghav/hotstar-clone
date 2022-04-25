module.exports = {
  content: [
    "./pages/**/*.{js,ts,tsx,jsx}",
    "./components/**/*.{js,ts,tsx,jsx}"
  ],
  theme: {
    fontFamily: {
      sans: ["Roboto", ],
    },
    extend: {
      colors: {
        "brand-blue": "#1f80e0",
        "brand-red": "#f15151",
        "brand-orange": "db882a",
        "brand-dark-blue":"#131A28",
        "brand-bg":"#0C111B",
      },
      keyframes: {
        expandSearch: {
          "0%": { width: "100%" },
          "100%": { width: "170%" }
        },
        contractSearch: {
          "0%": { width: "" },
          "100%": { width: "100%" }
        },
      },
      animation: {
        expandSearch: "expandSearch .2s ease-in forwards",
        contractSearch: "contractSearch .2s ease-in forwards"
      }
    },
  },
  plugins: [],
}
