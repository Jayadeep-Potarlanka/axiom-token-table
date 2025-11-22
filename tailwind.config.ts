import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        foreground: "#ffffff",
        primary: {
          DEFAULT: "#3b82f6",
          hover: "#2563eb",
        },
        success: {
          DEFAULT: "#10b981",
          light: "#d1fae5",
        },
        danger: {
          DEFAULT: "#ef4444",
          light: "#fee2e2",
        },
        border: "#1f2937",
        card: "#111827",
        muted: "#374151",
      },
      animation: {
        shimmer: "shimmer 2s infinite",
        "price-up": "priceUp 0.5s ease-out",
        "price-down": "priceDown 0.5s ease-out",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        priceUp: {
          "0%": { backgroundColor: "rgba(16, 185, 129, 0.3)" },
          "100%": { backgroundColor: "transparent" },
        },
        priceDown: {
          "0%": { backgroundColor: "rgba(239, 68, 68, 0.3)" },
          "100%": { backgroundColor: "transparent" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
