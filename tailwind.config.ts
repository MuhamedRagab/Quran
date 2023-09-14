import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "400px",
        xxl: "1440px",
      },
      container: {
        center: true,
      },
    },
  },
  daisyui: {
    themes: ["coffee", "dark", "dracula", "luxury", "forest", "night"],
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
};
export default config;
