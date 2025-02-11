// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

import vue from "@astrojs/vue";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://openobserve.ai", // Replace with your website URL
  integrations: [vue(), tailwind(), sitemap()],
  // redirects: {
  //   "/resources/author/[...author]": "/articles/author/[...author]",
  // },
});
