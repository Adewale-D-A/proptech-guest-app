/** @format */

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "576",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      lgs: "1065px",
      custom: "1160px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      animation: {
        "border-animate": "border-animate 0.3s ease-in-out",
        marquee: "marquee var(--duration) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
      },
      keyframes: {
        "border-animate": {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        lightBlue: "#5A76D9",
        yellow: "#FFDE4E",
        green: "#00BB40",
        gray: {
          100: "#6D6D6D",
        },
        primary: {
          DEFAULT: "#284499",
          1: "#293e8e",
        },
      },
    },
  },
  plugins: [],
};
export default config;
