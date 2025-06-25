// @ts-check
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";
import vue from "@astrojs/vue";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import node from "@astrojs/node";

const env = loadEnv(process.env.NODE_ENV ?? "development", process.cwd(), "");
const baseUrl = env.PUBLIC_APP_BASE_URL;

// https://astro.build/config
export default defineConfig({
  site: baseUrl, //change it with site url
  adapter: node({
    mode: "standalone",
  }),
  integrations: [vue(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },
});
