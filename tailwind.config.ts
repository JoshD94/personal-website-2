import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/contexts/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          bg: "var(--card-bg)",
          border: "var(--card-border)",
        },
        header: {
          bg: "var(--header-bg)",
        },
        peach: "#f2e4ce",
      },
      boxShadow: {
        custom: "0 4px 6px var(--shadow)",
      },
    },
  },
  plugins: [],
} satisfies Config;
