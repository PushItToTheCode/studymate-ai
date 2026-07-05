import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#FAFAFA",
        surface: "#FFFFFF",
        border: "rgba(0, 0, 0, 0.08)",
        primary: "#09090B",
        secondary: "#52525B",
        muted: "#A1A1AA",
        accent: "#6366F1", // Indigo-500 для акцентов
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        antigravity: {
          "0%": { transform: "translateY(0) scale(1) rotate(0deg)", opacity: "1", filter: "blur(0px)" },
          "30%": { transform: "translateY(20px) scale(0.96) rotate(-2deg)", opacity: "1" },
          "100%": { transform: "translateY(-120vh) scale(0.8) rotate(15deg)", opacity: "0", filter: "blur(12px)" },
        },
        fadeIn: {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        }
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        antigravity: "antigravity 2.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        fadeIn: "fadeIn 0.4s ease-out forwards",
      },
    },
  },
  plugins: [],
};
export default config;
