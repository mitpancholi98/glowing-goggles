import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    theme: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
    },
  },
  content: ["./src/**/*.{js,ts,jsx,tsx,html}"],
  plugins: [],
};
export default config;
