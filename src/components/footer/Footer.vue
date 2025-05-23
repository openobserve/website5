<script setup>
import GithubButton from "vue-github-button";
import TextGradient from "@/components/core/TextWithGradient.vue";
import { computed, onMounted } from "vue";
const props = defineProps({
  footerData: {
    type: Object,
    required: true,
  },
  copyRightText: {
    type: String,
    required: true,
  },
  termsOfService: {
    type: Object,
    required: true,
  },
  privacyText: {
    type: Object,
    required: true,
  },
  socialMedia: {
    type: Array,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const firstSections = computed(
  () => props.footerData.slice(0, Math.min(4, props.footerData.length)) || []
);
const lastSection = computed(() => props.footerData?.[4] || null);

const getCurrentYear = () => new Date().getFullYear();

// Function to return the correct icon path based on name
const socialIcon = (name) => {
  const icons = {
    slack: "/img/icon/slack-icon.svg",
    twitter: "/img/icon/twitter-icon.svg",
    linkdin: "/img/icon/linkdin-icon.svg",
    github: "/img/icon/github-icon.svg",
    youtube: "/img/icon/youtube-icon.svg",
  };
  return icons[name.toLowerCase()];
};

onMounted(() => {
  const script = document.createElement("script");
  script.src = "https://openobserve.activehosted.com/f/embed.php?id=3";
  script.async = true;
  document.head.appendChild(script);
});
</script>
<template>
  <footer class="relative bg-primary-black w-full">
    <!-- SVG Background -->
    <svg class="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1221 684" fill="none">
      <g filter="url(#filter0_f_1434_1855)">
        <circle cx="610.5" cy="610.5" r="410.5" fill="url(#paint0_radial_1434_1855)" />
      </g>
      <defs>
        <filter id="filter0_f_1434_1855" x="0" y="0" width="1221" height="1221" filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="100" result="effect1_foregroundBlur_1434_1855" />
        </filter>
        <radialGradient id="paint0_radial_1434_1855" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
          gradientTransform="translate(610.5 610.5) rotate(90) scale(410.5)">
          <stop offset="0.01" stop-color="#23282C" />
          <stop offset="0.885" stop-color="#23282C" stop-opacity="0" />
        </radialGradient>
      </defs>
    </svg>

    <div class="relative container mx-auto px-4 py-6 lg:px-8 xl:px-12">
      <!-- Main Grid Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <!-- Left side - first 2 sections -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-for="(section, index) in firstSections.slice(0, 2)" :key="section.title" class="min-w-0">
            <h2 class="text-white font-medium text-xl mb-3">
              {{ section.title }}
            </h2>
            <ul class="space-y-2">
              <li v-for="item in section.items" :key="item.text">
                <a :href="item.link" :target="item.target"
                  class="gradient-hover text-gray-300 text-base transition duration-300">
                  {{ item.text }}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <!-- Right side - next 2 sections + newsletter -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          <!-- Next 2 sections -->
          <div v-for="(section, index) in firstSections.slice(2, 4)" :key="section.title" class="min-w-0">
            <h2 class="text-white font-medium text-xl mb-3">
              {{ section.title }}
            </h2>
            <ul class="space-y-2">
              <li v-for="item in section.items" :key="item.text">
                <a :href="item.link" :target="item.target"
                  class="gradient-hover text-gray-300 text-base transition duration-300">
                  {{ item.text }}
                </a>
              </li>
            </ul>
          </div>

          <!-- Newsletter section -->
          <div class="md:col-span-2 lg:col-span-2">
            <div class="_form_3 w-full flex justify-end"></div>
          </div>
        </div>
      </div>

      <!-- SOC2 and GitHub section -->
      <div class="flex justify-center lg:justify-end py-4">
        <div class="flex items-center gap-6">
          <div class="w-12 h-12 flex-shrink-0">
            <img src="/img/soc.webp" class="w-full h-full object-contain grayscale" alt="SOC2 Type 2" />
          </div>

          <div class="flex flex-col text-white">
            <h2 class="text-sm sm:text-base whitespace-nowrap">SOC2 Type 2</h2>
            <p class="text-xs sm:text-sm whitespace-nowrap">Certified</p>
          </div>

          <div class="flex flex-wrap justify-center md:justify-start gap-2">
            <GithubButton href="https://github.com/openobserve/openobserve" data-color-scheme="" data-size="large"
              data-show-count="true" aria-label="Star openobserve/openobserve on GitHub">
              Star
            </GithubButton>
          </div>
        </div>
      </div>

      <!-- Bottom Section -->
      <div
        class="border-t border-gray-700 pt-5 flex flex-col gap-5 lg:flex-row justify-between items-center text-white">
        <!-- Copyright -->
        <div class="flex flex-col items-center lg:items-start space-y-0.5">
          <p class="md:mb-0 font-normal text-xs">
            {{ copyRightText }} © {{ getCurrentYear() }}
          </p>
          <p class="font-normal text-center lg:text-start text-xs">
            {{ address }}
          </p>
        </div>
        <div class="flex items-center gap-4">
          <a :href="termsOfService?.link" :target="termsOfService?.target" class="text-base gradient-hover">
            {{ termsOfService?.text }}
          </a>
          <a :href="privacyText?.link" :target="privacyText?.target" class="text-base gradient-hover">
            {{ privacyText?.text }}
          </a>
        </div>

        <div class="flex items-center space-x-4">
          <!-- Social Links -->
          <div class="flex gap-4">
            <a v-for="(item, index) in socialMedia" :key="index" :href="item.link"
              class="flex items-center justify-center p-3 rounded-lg transition-all duration-200 hover:bg-white hover:bg-opacity-10"
              target="_blank">
              <img :src="socialIcon(item.name)" class="w-6 h-6" :alt="item.name + ' icon'" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.gradient-hover {
  display: inline-block;
}

.gradient-hover:hover {
  color: #7782FF;
}
</style>