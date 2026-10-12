import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
          950: "#1e1b4b",
        },
        obsidian: {
          800: "#131826",
          850: "#0f1422",
          900: "#0b0f19",
          950: "#07090e",
        },
      },
      boxShadow: {
        "glow-sm": "0 0 20px -5px rgba(99, 102, 241, 0.3)",
        "glow-md": "0 0 35px -5px rgba(99, 102, 241, 0.35)",
        "glow-lg": "0 0 50px -10px rgba(99, 102, 241, 0.4)",
        "glow-cyan": "0 0 35px -5px rgba(6, 182, 212, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
