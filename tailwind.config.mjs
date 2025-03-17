/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1025px",
      xl: "1440px",
      xxl:"1560px",
    },
    extend: {
      backgroundImage: {
        "gradient-blue": "var(--gradient-blue)",
        "gradient-light-blue": "var(--gradient-light-blue)",
        "gradient-gray": "var(--gradient-gray)",
        "gradient-text": "var(--gradient-text)",
        "gradient-title-au": "var(--gradient-title-au)",
        "gradient-title-cu": "var(--gradient-title-cu)",
        "gradient-title-ju": "var(--gradient-title-ju)",

      },
      colors: {
        theme: {
          primary: {
            DEFAULT: "rgba(var(--text-theme-primary-color), 1)",
            100: "rgba(var(--text-theme-primary-color-100), 1)",
            200: "rgba(var(--text-theme-primary-color-200), 1)",
            300: "rgba(var(--text-theme-primary-color-300), 1)",
            400: "rgba(var(--text-theme-primary-color-400), 1)",
            500: "rgba(var(--text-theme-primary-color-500), 1)",
            600: "rgba(var(--text-theme-primary-color-600), 1)",
            700: "rgba(var(--text-theme-primary-color-700), 1)",
            800: "rgba(var(--text-theme-primary-color-800), 1)",
            900: "rgba(var(--text-theme-primary-color-900), 1)",
          },
        },
        background: "rgba(var(--button-primary-color),1)",
        button: {
          primary: {
            "bg-blue-dark": "rgba(var(--bg-blue-dark), 1)",
            "bg-blue-light": "rgba(var(--bg-blue-light), 1)",
            "bg-sky-blue": "rgba(var(--bg-sky-blue), 1)",
          },
          secondary: {
            "bg-light-blue": "rgba(var(--bg-light-blue), 0.8)",
            "bg-light-sky-blue": "rgba(var(--bg-light-sky-blue), 0.8)",
            "bg-dark-sky-blue": "rgba(var(--bg-dark-sky-blue), 0.8)",
          },
          tertiary: {
            "--bg-tertiary-blue": "rgba(var(--bg-tertiary-blue), 0.8)",
            "--bg-tertiary-light-blue":
              "rgba(var(--bg-tertiary-light-blue), 0.8)",
            "--bg-tertiary-sky": "rgba(var(--bg-tertiary-sky), 0.8)",
          },
          "bg-gray-dark": "rgba(var(--bg-gray-dark), 0.2)",
          "bg-gray-light": "rgba(var(--bg-gray-light), 0.2)",
        },
      },
    },
  },
  plugins:  [require('@tailwindcss/typography')],
};
