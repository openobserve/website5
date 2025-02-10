// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';


import vue from '@astrojs/vue';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://your-website.com', // Replace with your website URL
  integrations: [vue(), tailwind(), sitemap()],
  redirects: {
    "/resources/[...slug]": "/articles/[...slug]",
    "/resources/page/[...slug]": "/articles/page/[...slug]",
    "/resources/tag/[...slug]": "/articles/tag/[...slug]",
    "/resources/author/[...slug]": "/articles/author/[...slug]",
  },
});