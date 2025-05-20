// @ts-check
import { defineConfig } from "astro/config";

import vue from "@astrojs/vue";
import tailwindcss from "@tailwindcss/vite";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "http://localhost:3000", //change it with site url
  integrations: [vue(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  redirects: {
    "/platform/alerts/": "/alerts/",
    "/platform/alerting/": "/alerts/",
    "/solutions/aws-monitoring/": "/aws-monitoring/",
    "/solutions/azure-monitoring/": "/azure-monitoring/",
    "/contactus/": "/contact-us/",
    "/contact/": "/contact-us/",
    "/case-studies/": "/customer-stories/",
    "/solutions/database-monitoring/": "/database-monitoring/",
    "/platform/frontend-monitoring/": "/frontend-monitoring/",
    "/solutions/gcp-monitoring/": "/gcp-monitoring/",
    "/solutions/kubernetes-observability/": "/kubernetes-monitoring/",
    "/platform/logs/": "/logs/",
    "/platform/metrics/": "/metrics/",
    "/platform/opentelemetry/": "/opentelemetry/",
    "/platform/pipelines/": "/pipelines/",
    "/platform/traces/": "/traces/",
    "/platform/visualization-and-dashboards/": "/visualization-and-dashboards/",
    "/solutions/devops-sre/": "/solutions/",
    "/solutions/development-teams/": "/solutions/",
    "/why-choose-us/": "/",
    "/key-features/": "/platform/",
  },
});
