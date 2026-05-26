import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#1A1410",
        cask: "#221C16",
        border: { DEFAULT: "#3A3128", soft: "#2A2218" },
        ash: { DEFAULT: "#8A7F70", soft: "#5A5147" },
        cream: { DEFAULT: "#EBE2D0", soft: "#B5AA98" },
        amber: "#C9842B",
        gold: "#D4A056",
        oxblood: "#6B2D2D",
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
        sans: ["-apple-system", "BlinkMacSystemFont", "Noto Sans KR", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        "mono-eyebrow": "0.18em",
        "mono-tight": "0.06em",
      },
    },
  },
  plugins: [],
};
export default config;
