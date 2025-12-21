/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    // 반응형 Breakpoints
    screens: {
      sm: "640px",   // Mobile Large
      md: "768px",   // Tablet
      lg: "1024px",  // Desktop
      xl: "1280px",  // Desktop Large
      "2xl": "1536px",
    },
    extend: {
      // CSS Variables 기반 Color System
      colors: {
        brand: {
          50: "var(--color-brand-50)",
          100: "var(--color-brand-100)",
          200: "var(--color-brand-200)",
          300: "var(--color-brand-300)",
          400: "var(--color-brand-400)",
          500: "var(--color-brand-500)",
          600: "var(--color-brand-600)",
          700: "var(--color-brand-700)",
          800: "var(--color-brand-800)",
          900: "var(--color-brand-900)",
        },
        primary: {
          50: "var(--color-brand-50)",
          100: "var(--color-brand-100)",
          200: "var(--color-brand-200)",
          300: "var(--color-brand-300)",
          400: "var(--color-brand-400)",
          500: "var(--color-brand-500)",
          600: "var(--color-brand-600)",
          700: "var(--color-brand-700)",
          800: "var(--color-brand-800)",
          900: "var(--color-brand-900)",
        },
        neutral: {
          50: "var(--color-neutral-50)",
          100: "var(--color-neutral-100)",
          200: "var(--color-neutral-200)",
          300: "var(--color-neutral-300)",
          400: "var(--color-neutral-400)",
          500: "var(--color-neutral-500)",
          600: "var(--color-neutral-600)",
          700: "var(--color-neutral-700)",
          800: "var(--color-neutral-800)",
          900: "var(--color-neutral-900)",
        },
        error: {
          500: "var(--color-error-500)",
          600: "var(--color-error-600)",
        },
        success: {
          500: "var(--color-success-500)",
          600: "var(--color-success-600)",
        },
        warning: {
          500: "var(--color-warning-500)",
          600: "var(--color-warning-600)",
        },
        info: {
          500: "var(--color-info-500)",
          600: "var(--color-info-600)",
        },
      },
      // Typography
      fontFamily: {
        sans: ["var(--font-primary)"],
        display: ["var(--font-display)"],
        mono: ["var(--font-mono)"],
      },
      fontSize: {
        // Display
        "display-lg": [
          "var(--font-size-display-lg)",
          {
            lineHeight: "var(--line-height-tight)",
            letterSpacing: "var(--letter-spacing-tight)",
            fontWeight: "var(--font-weight-bold)",
          },
        ],
        "display-md": [
          "var(--font-size-display-md)",
          {
            lineHeight: "var(--line-height-tight)",
            letterSpacing: "var(--letter-spacing-tight)",
            fontWeight: "var(--font-weight-bold)",
          },
        ],
        "display-sm": [
          "var(--font-size-display-sm)",
          {
            lineHeight: "var(--line-height-snug)",
            letterSpacing: "var(--letter-spacing-tight)",
            fontWeight: "var(--font-weight-semibold)",
          },
        ],
        // Heading
        "heading-xl": [
          "var(--font-size-heading-xl)",
          {
            lineHeight: "var(--line-height-snug)",
            fontWeight: "var(--font-weight-semibold)",
          },
        ],
        "heading-lg": [
          "var(--font-size-heading-lg)",
          {
            lineHeight: "var(--line-height-snug)",
            fontWeight: "var(--font-weight-semibold)",
          },
        ],
        "heading-md": [
          "var(--font-size-heading-md)",
          {
            lineHeight: "var(--line-height-normal)",
            fontWeight: "var(--font-weight-semibold)",
          },
        ],
        "heading-sm": [
          "var(--font-size-heading-sm)",
          {
            lineHeight: "var(--line-height-normal)",
            fontWeight: "var(--font-weight-medium)",
          },
        ],
        // Body
        "body-lg": [
          "var(--font-size-body-lg)",
          { lineHeight: "var(--line-height-relaxed)" },
        ],
        "body-md": [
          "var(--font-size-body-md)",
          { lineHeight: "var(--line-height-relaxed)" },
        ],
        "body-sm": [
          "var(--font-size-body-sm)",
          { lineHeight: "var(--line-height-normal)" },
        ],
        // Label
        "label-lg": [
          "var(--font-size-label-lg)",
          {
            lineHeight: "var(--line-height-normal)",
            fontWeight: "var(--font-weight-medium)",
          },
        ],
        "label-md": [
          "var(--font-size-label-md)",
          {
            lineHeight: "var(--line-height-normal)",
            fontWeight: "var(--font-weight-medium)",
          },
        ],
        "label-sm": [
          "var(--font-size-label-sm)",
          {
            lineHeight: "var(--line-height-normal)",
            fontWeight: "var(--font-weight-medium)",
          },
        ],
      },
      fontWeight: {
        light: "var(--font-weight-light)",
        normal: "var(--font-weight-normal)",
        medium: "var(--font-weight-medium)",
        semibold: "var(--font-weight-semibold)",
        bold: "var(--font-weight-bold)",
      },
      // Spacing - 8pt Grid
      spacing: {
        0: "var(--spacing-0)",
        1: "var(--spacing-1)",
        2: "var(--spacing-2)",
        3: "var(--spacing-3)",
        4: "var(--spacing-4)",
        5: "var(--spacing-5)",
        6: "var(--spacing-6)",
        8: "var(--spacing-8)",
        10: "var(--spacing-10)",
        12: "var(--spacing-12)",
        14: "var(--spacing-14)",
        16: "var(--spacing-16)",
        18: "var(--spacing-18)",
        20: "var(--spacing-20)",
        24: "var(--spacing-24)",
        32: "var(--spacing-32)",
      },
      // Border Radius
      borderRadius: {
        none: "var(--radius-none)",
        sm: "var(--radius-sm)",
        DEFAULT: "var(--radius-base)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
        full: "var(--radius-full)",
      },
      // Box Shadow
      boxShadow: {
        xs: "var(--shadow-xs)",
        sm: "var(--shadow-sm)",
        DEFAULT: "var(--shadow-base)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
        "2xl": "var(--shadow-2xl)",
      },
      // Z-index
      zIndex: {
        dropdown: "var(--z-dropdown)",
        sticky: "var(--z-sticky)",
        fixed: "var(--z-fixed)",
        "modal-backdrop": "var(--z-modal-backdrop)",
        modal: "var(--z-modal)",
        popover: "var(--z-popover)",
        tooltip: "var(--z-tooltip)",
      },
      // Transition
      transitionDuration: {
        fast: "var(--transition-fast)",
        DEFAULT: "var(--transition-base)",
        slow: "var(--transition-slow)",
        slower: "var(--transition-slower)",
      },
      transitionTimingFunction: {
        "in": "var(--ease-in)",
        "out": "var(--ease-out)",
        "in-out": "var(--ease-in-out)",
      },
      // Container
      maxWidth: {
        "container-sm": "var(--container-sm)",
        "container-md": "var(--container-md)",
        "container-lg": "var(--container-lg)",
        "container-xl": "var(--container-xl)",
        "container-2xl": "var(--container-2xl)",
      },
    },
  },
  plugins: [],
};
