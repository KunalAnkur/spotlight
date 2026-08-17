import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
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
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        primaryDark: "var(--primaryDark)",
        secondaryDark: "var(--secondaryDark)",
        hover: "var(--hover)",
        smoothWhite: "var(--smoothWhite)",
        cardBg: "var(--cardBg)",
        coral: "hsl(var(--coral))",
        amber: "hsl(var(--amber))",
        purple: "hsl(var(--purple))",
        teal: "hsl(var(--teal))",
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      // Tailwind's colour opacity modifier only accepts values that exist in `theme.opacity`,
      // and the default scale jumps 5 → 10 → 20. Everything off that scale — `text-white/68`,
      // `bg-white/8`, `ring-white/8` and 60-odd others already written across this codebase —
      // silently compiled to nothing, so that text rendered at full white and `ring-1` fell
      // back to Tailwind's default blue. Opening the scale to every integer makes the classes
      // mean what they say instead of rewriting each one as `/[0.68]`.
      opacity: Object.fromEntries(
        Array.from({ length: 101 }, (_, value) => [value, `${value / 100}`]),
      ),
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        parkinsans: ["var(--parkinsans)", "sans-serif"],
      },
      backgroundImage: {
        secondary: "var(--secondary)",
        logoColor: "var(--logoColor)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.32s cubic-bezier(0.22,1,0.36,1)",
        "accordion-up": "accordion-up 0.32s cubic-bezier(0.22,1,0.36,1)",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
} satisfies Config;
