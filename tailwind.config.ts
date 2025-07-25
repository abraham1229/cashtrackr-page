import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "auth": "url('/chart.svg')"
      },
      backgroundSize: {
        "30": "30rem"
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
};
export default config;
