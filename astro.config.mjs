import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import vue from "@astrojs/vue";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://prod-website.openobserve.ai", // Replace with your website URL
  integrations: [vue(), tailwind(), sitemap()],
  server: {
    proxy: {
      "/api/triggerEmail": {
        target: "https://1qlewft2ie.execute-api.us-west-2.amazonaws.com",
        changeOrigin: true,
        rewrite: (path) => "/default/triggerEmail", // Adjust based on API Gateway stage
      },
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  },
});