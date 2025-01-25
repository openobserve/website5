<script setup>
import { ref } from "vue";
import CustomButton from "../core/CustomButton.vue";
import CustomHoverHeader from "./CustomHoverHeader.vue";
import CustomHeaderButton from "./CustomHeaderButton.vue";
import LaptopView from "./LaptopView.vue";
import SectionHeader from "./SectionHeader.vue";
import MobileView from "./MobileView.vue";
const platformData = {
  platform: {
    title: "Observability Suite",
    items: [
      {
        title: "Metrics",
        items: [
          {
            title: "Time-series Data",
            link: "url_to_metric_data_1",
          },
          {
            title: "Prometheus Compatibility",
            link: "url_to_metric_data_2",
          },
          {
            title: "Custom Metrics",
            link: "url_to_metric_data_3",
          },
        ],
      },
      {
        title: "Logs",
        items: [
          {
            title: "Real-time Log Analytics",
            link: "platform/logs",
          },
          {
            title: "Full-text Search",
            link: "url_to_logs_2",
          },
          {
            title: "Log Parsing & Filtering",
            link: "url_to_logs_3",
          },
          {
            title: "Log Compression",
            link: "url_to_logs_4",
          },
        ],
      },
      {
        title: "Pipelines",
        items: [
          {
            title: "VRL Functions",
            link: "url_to_pipelines_1",
          },
          {
            title: "Log parsing",
            link: "url_to_pipelines_2",
          },
          {
            title: "Logs to Metrics",
            link: "url_to_pipelines_3",
          },
          {
            title: "Metrics Summary",
            link: "url_to_pipelines_4",
          },
          {
            title: "Traces to Metrics",
            link: "url_to_pipelines_5",
          },
        ],
      },
      {
        title: "Traces",
        items: [
          {
            title: "Distributed Tracing",
            link: "url_to_tracing_1",
          },
          {
            title: "OpenTelemetry Support",
            link: "url_to_tracing_2",
          },
          {
            title: "Service Dependencies",
            link: "url_to_tracing_3",
          },
        ],
      },
      {
        title: "Alerting",
        items: [
          {
            title: "Scheduled Alerts",
            link: "url_to_alerting_1",
          },
          {
            title: "Real Time Alerts",
            link: "url_to_alerting_2",
          },
          {
            title: "Integrated Dashboards",
            link: "url_to_alerting_3",
          },
          {
            title: "Flexible Query Functions",
            link: "url_to_alerting_4",
          },
        ],
      },
      {
        title: "Frontend Monitoring",
        items: [
          {
            title: "Real User Monitoring (RUM)",
            link: "url_to_rum_1",
          },
          {
            title: "Session Replay",
            link: "url_to_rum_2",
          },
          {
            title: "Error Tracking",
            link: "url_to_rum_3",
          },
        ],
      },

      {
        title: "Visualisation & Dashboards",
        items: [
          {
            title: "Customizable Dashboard",
            link: "url_to_visualisation_1",
          },
          {
            title: "Real Time Data Exploration",
            link: "url_to_visualisation_2",
          },
          {
            title: "Data Source Integration",
            link: "url_to_visualisation_3",
          },
          {
            title: "Comprehensive Analytics",
            link: "url_to_visualisation_4",
          },
        ],
      },
    ],
    keyFeature: {
      title: "Key Features",
      items: [
        {
          title: "High Availability",
        },
        {
          title: "Role-Based Access Control (RBAC)",
        },
        {
          title: "Multi-Tenancy",
        },
        {
          title: "Federated Search",
        },
        {
          title: "Dynamic Schema Evolution",
        },
        {
          title: "Query Management",
        },
        {
          title: "Advanced Multilingual GUI",
        },
        {
          title: "Workload Management (QoS)",
        },
        {
          title: "Reports Generation",
        },
        {
          title: "Audit Trial",
        },
        {
          title: "Single Sign-On",
        },
      ],
    },
  },
  solutions: {
    useCases: [
      { title: "AWS Monitoring", link: "#" },
      { title: "Azure Monitoring", link: "#" },
      { title: "GCP Monitoring", link: "#" },
      { title: "Kubernetes Observability", link: "#" },
      { title: "Database Monitoring", link: "#" },
      { title: "Infrastructure Monitoring", link: "#" },
      { title: "Security & Audit Logs", link: "#" },
      { title: "Cost Optimization", link: "#" },
    ],
    byTeam: [
      { title: "DevOps & SRE", link: "#" },
      { title: "Platform Engineering", link: "#" },
      { title: "Development Teams", link: "#" },
    ],
    sandbox: { title: "Sandbox", link: "#" },
    cta: {
      text: "Full Stack Observability Platform",
      link: "#",
    },
    secondaryCTA: {
      text: "View all Solutions",
      link: "#",
    },
  },
  company: [
    { title: "About Us", link: "#" },
    { title: "Careers", link: "#" },
    { title: "Why OpenObserve?", link: "#" },
    { title: "Contact Us", link: "#" },
  ],
};

// const props=defineProps({
//   platformData: {
//     type: Object,
//     required: false,
//   },
// });
// Reactive state for hover functionality
const isPlatformHovered = ref(false);
const currentPlatform = ref(null);

// Handle hover event and position the dropdown dynamically
const onHover = (event) => {
  isPlatformHovered.value = true;
};

const onMouseLeave = () => {
  console.log("Hovered");
  isPlatformHovered.value = false;
};
</script>

<template>
  <!-- <header
    class="bg-black text-white flex items-center justify-between px-4 md:px-10 py-6 fixed top-0 left-0 w-full z-50 shadow-md"
  >
    <div class="flex items-center space-x-2">
      <img src="/Open Observe Logo.svg" alt="Logo" class="h-8 w-auto md:h-10" />
    </div>

    <nav
      class="hidden md:flex items-center space-x-6 text-theme-secondaryFont font-inter font-semibold text-lg"
    >
      <div class="relative w-full">
        <a
          class="hover:text-white transition cursor-pointer"
          @mouseenter="onHover"
          @mouseleave="onMouseLeave"
        >
          Platform
        </a>
      </div>

      <a href="#" class="hover:text-white transition">Solution</a>
      <a href="#" class="hover:text-white transition">Resources</a>
      <a href="#" class="hover:text-white transition">Company</a>
    </nav>

    <div class="flex items-center space-x-2 md:space-x-4">
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
  <div
    class="absolute top-24 left-[35%] z-60"
    v-if="isPlatformHovered"
   
  >
    <CustomHoverHeader>
      <div>
        <h3 class="text-2xl font-bold pb-5 text-[#FFFFFF]">
          {{ platformData.platform.title }}
        </h3>

        <div class="flex flex-col md:hidden justify-between gap-4 mb-4">
          <CustomHeaderButton
            title="Full Stack Observability Platform"
            linkTitle="View Platform"
          />
          <button class="btn">Pricing</button>
        </div>

        <div class="w-full flex justify-between flex-col md:flex-row gap-2">
          <div
            class="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          >
            <div
              v-for="(item, index) in platformData.platform.items"
              :key="index"
            >
              <SectionHeader :title="item.title" :items="item.items" />
            </div>
          </div>

          <div class="w-full md:w-1/3 bg-gray-700 bg-opacity-50 p-4 rounded-lg">
            <SectionHeader
              :title="platformData.platform.keyFeature.title"
              :items="platformData.platform.keyFeature.items"
            />
          </div>
        </div>
        <div
          class="hidden md:flex flex-col md:flex-row justify-between mt-6 gap-4"
        >
          <CustomHeaderButton
            title="Full Stack Observability Platform"
            linkTitle="View Platform"
          />
          <button class="btn">Pricing</button>
        </div>
      </div>
    </CustomHoverHeader>
  </div>-->
  <div
    class="fixed w-full top-0 z-50 backdrop-blur-sm bg-white text-black transition-all duration-500"
    :class="y > 20 ? 'drop-shadow-md ' : ''"
    id="header-class"
  >
    <div class="lg:block hidden">
      <LaptopView :items="platformData" />
    </div>
    <div class="lg:hidden block">
      <MobileView :items="platformData" />
    </div>
  </div>
</template>

<style scoped>
/* Add custom styles only if absolutely necessary */
.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  list-style-type: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
