// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import vue from "@astrojs/vue";
import tailwind from "@astrojs/tailwind";
import pagefind from "astro-pagefind";


// https://astro.build/config
export default defineConfig({
  site: "https://openobserve.ai", // Replace with your website URL
  integrations: [vue(), tailwind(), sitemap(), pagefind()],
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },
  build: {
    format: "file",
  },
});
