/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
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
      },
    },
  },
  plugins: [],
};
