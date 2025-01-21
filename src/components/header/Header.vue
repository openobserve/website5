<script setup>
import { ref } from "vue";
import CustomButton from "../core/CustomButton.vue";

// Reactive state for hover functionality
const isPlatformHovered = ref(false);
const currentPlatform = ref(null);
// const platformData = {
//   platform: {
//     title: "Observability Suite",
//     items: [
//       {
//         title: "Metrics",
//         items: [
//           {
//             title: "Time-series Data",
//             link: "url_to_metric_data_1",
//           },
//           {
//             title: "Prometheus Compatibility",
//             link: "url_to_metric_data_2",
//           },
//           {
//             title: "Custom Metrics",
//             link: "url_to_metric_data_3",
//           },
//         ],
//       },
//       {
//         title: "Traces",
//         items: [
//           {
//             title: "Distributed Tracing",
//             link: "url_to_tracing_1",
//           },
//           {
//             title: "OpenTelemetry Support",
//             link: "url_to_tracing_2",
//           },
//           {
//             title: "Service Dependencies",
//             link: "url_to_tracing_3",
//           },
//         ],
//       },
//       {
//         title: "Frontend Monitoring",
//         items: [
//           {
//             title: "Real User Monitoring (RUM)",
//             link: "url_to_rum_1",
//           },
//           {
//             title: "Session Replay",
//             link: "url_to_rum_2",
//           },
//           {
//             title: "Error Tracking",
//             link: "url_to_rum_3",
//           },
//         ],
//       },
//       {
//         title: "Logs",
//         items: [
//           {
//             title: "Real-time Log Analytics",
//             link: "url_to_logs_1",
//           },
//           {
//             title: "Full-text Search",
//             link: "url_to_logs_2",
//           },
//           {
//             title: "Log Parsing & Filtering",
//             link: "url_to_logs_3",
//           },
//           {
//             title: "Log Compression",
//             link: "url_to_logs_4",
//           },
//         ],
//       },
//       {
//         title: "Alerting",
//         items: [
//           {
//             title: "Scheduled Alerts",
//             link: "url_to_alerting_1",
//           },
//           {
//             title: "Real Time Alerts",
//             link: "url_to_alerting_2",
//           },
//           {
//             title: "Integrated Dashboards",
//             link: "url_to_alerting_3",
//           },
//           {
//             title: "Flexible Query Functions",
//             link: "url_to_alerting_4",
//           },
//         ],
//       },
//       {
//         title: "Pipelines",
//         items: [
//           {
//             title: "VRL Functions",
//             link: "url_to_pipelines_1",
//           },
//           {
//             title: "Log parsing",
//             link: "url_to_pipelines_2",
//           },
//           {
//             title: "Logs to Metrics",
//             link: "url_to_pipelines_3",
//           },
//           {
//             title: "Metrics Summary",
//             link: "url_to_pipelines_4",
//           },
//           {
//             title: "Traces to Metrics",
//             link: "url_to_pipelines_5",
//           },
//         ],
//       },
//       {
//         title: "Visualisation & Dashboards",
//         items: [
//           {
//             title: "Customizable Dashboard",
//             link: "url_to_visualisation_1",
//           },
//           {
//             title: "Real Time Data Exploration",
//             link: "url_to_visualisation_2",
//           },
//           {
//             title: "Data Source Integration",
//             link: "url_to_visualisation_3",
//           },
//           {
//             title: "Comprehensive Analytics",
//             link: "url_to_visualisation_4",
//           },
//         ],
//       },
//     ],
//     keyFeature: {
//       title: "Key Features",
//       items: [
//         {
//           title: "High Availability",
//         },
//         {
//           title: "Role-Based Access Control (RBAC)",
//         },
//         {
//           title: "Multi-Tenancy",
//         },
//         {
//           title: "Federated Search",
//         },
//         {
//           title: "Dynamic Schema Evolution",
//         },
//         {
//           title: "Query Management",
//         },
//         {
//           title: "Advanced Multilingual GUI",
//         },
//         {
//           title: "Workload Management (QoS)",
//         },
//         {
//           title: "Reports Generation",
//         },
//         {
//           title: "Audit Trial",
//         },
//         {
//           title: "Single Sign-On",
//         },
//       ],
//     },
//   },
// };
</script>

<template>
  <header
    class="bg-black text-white flex items-center justify-between px-4 py-3 sm:px-6 md:py-4 fixed top-0 left-0 w-full z-50 shadow-md"
  >
    <!-- Logo -->
    <div class="flex items-center space-x-2">
      <img src="/Open Observe Logo.svg" alt="Logo" class="h-8 w-auto md:h-10" />
    </div>

    <!-- Navigation -->
    <nav
      class="hidden md:flex items-center space-x-6 text-[#BEC0C2] font-inter font-semibold text-sm"
    >
      <a
        href="#"
        class="hover:text-white transition"
        @mouseenter="onHover('platform')"
        @mouseleave="onMouseLeave"
        >Platform</a
      >

      <a href="#" class="hover:text-white transition">Solution</a>
      <a href="#" class="hover:text-white transition">Resources</a>
      <a href="#" class="hover:text-white transition">Company</a>
    </nav>

    <!-- Actions -->
    <div class="flex items-center space-x-2 md:space-x-4">
      <!-- CustomButton Components -->
      <CustomButton variant="tertiary" class="text-xs sm:text-sm font-semibold">
        LOGIN IN
      </CustomButton>
      <CustomButton
        variant="secondary"
        class="text-xs sm:text-sm font-semibold"
      >
        DOWNLOAD
      </CustomButton>
      <CustomButton variant="primary" class="text-xs sm:text-sm font-semibold">
        GET DEMO
      </CustomButton>
    </div>

    <!-- Mobile Menu Button (for smaller screens) -->
    <button
      class="md:hidden text-white focus:outline-none focus:ring-2 focus:ring-white"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3 5h18M3 12h18m-6 7h6"
        />
      </svg>
    </button>
  </header>
</template>

<style scoped>
/* Add custom styles only if absolutely necessary */
</style>
