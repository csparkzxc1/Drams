import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: "#0C0A08", light: "#141210" },
        cask: { DEFAULT: "#1A1714", light: "#211E1A" },
        border: { DEFAULT: "#2E2922", soft: "#1E1B17" },
        ash: { DEFAULT: "#7A7064", soft: "#4A4540" },
        cream: { DEFAULT: "#F0E8D8", soft: "#B5AA98" },
        amber: "#C9842B",
        gold: { DEFAULT: "#D4A056", light: "#E8C080" },
        oxblood: "#6B2D2D",
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
        sans: ["-apple-system", "BlinkMacSystemFont", "Noto Sans KR", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        "mono-eyebrow": "0.2em",
        "mono-tight": "0.06em",
      },
    },
  },
  plugins: [],
};
export default config;
