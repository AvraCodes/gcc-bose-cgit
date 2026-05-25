import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: { extend: { colors: { navy: "#0d1f3c", blue: "#1a4f96" } } },
  plugins: [],
};
export default config;
