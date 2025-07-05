/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#FFD700", // Vibrant Yellow
          foreground: "#1A1A40",
        },
        secondary: {
          DEFAULT: "#9B30FF", // Bright Purple
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#F5F5F5", // Light Grey
          foreground: "#1A1A40",
        },
        muted: {
          DEFAULT: "#F5F5F5",
          foreground: "#6B7280",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#1A1A40",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#1A1A40",
        },
        "vibrant-yellow": "#FFD700",
        "bright-purple": "#9B30FF",
        "dark-blue": "#1A1A40",
        "light-grey": "#F5F5F5",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Poppins", "system-ui", "sans-serif"],
      },
      animation: {
        glow: "glow 2s ease-in-out infinite alternate",
        "bounce-slow": "bounce 3s infinite",
        "pulse-slow": "pulse 3s infinite",
      },
      keyframes: {
        glow: {
          "0%": { boxShadow: "0 0 5px #FFD700, 0 0 10px #FFD700, 0 0 15px #FFD700" },
          "100%": { boxShadow: "0 0 10px #FFD700, 0 0 20px #FFD700, 0 0 30px #FFD700" },
        },
      },
      boxShadow: {
        glow: "0 0 20px rgba(255, 215, 0, 0.5)",
        "glow-purple": "0 0 20px rgba(155, 48, 255, 0.5)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
