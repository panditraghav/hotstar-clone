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
        "brand-orange": "#db882a",
        "brand-dark-blue":"#131A28",
        "brand-bg":"#0C111B",
        "header":"#121926",
        "brand-bg-1":"#192133",
        "brand-bg-2":"#334366",
        "brand-gradient-0": "linear-gradient(180deg, #141B29 0%, #0C111B 100%)",
        "brand-gradient-x": "bg-gradient-to-b from-[#141B29] to-[#0C111B]",
        "brand-gradient-1": "linear-gradient(180deg, #192133 0%, #111826 100%)",
        "brand-gradient-2": "linear-gradient(180deg, #334366 0%, #334366 51.04%, #1C2940 100%)",
        "card-gradient":"#030B17"
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
