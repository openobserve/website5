<script setup>
import GithubButton from "vue-github-button";
import TextGradient from "../HeaderComponents/TextWithGradient.vue";
const props = defineProps({
  footerData: {
    type: Object,
    required: true,
    validator(value) {
      return (
        value.sections &&
        value.copyright &&
        value.githubStats &&
        value.socialLinks
      );
    },
  },
});
</script>
<template>
  <div class="relative bg-[#14181B] w-full">
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
    <!-- <CustomSection> -->
    <div class="relative container mx-auto px-4 py-6 lg:px-8 xl:px-12">
      <!-- Main Footer Content -->
      <div class="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8 mt-12">
        <div v-for="section in footerData?.sections" :key="section.title" class="min-w-0">
          <h3 class="text-[#929A9E] font-medium text-xl mb-4">
            {{ section.title }}
          </h3>

          <ul class="space-y-2">
            <li v-for="item in section.items" :key="item.name">
              <a :href="item.link" class="gradient-hover text-[#BEC0C2] text-base transition duration-300 ">
                <TextGradient textGradientColor="" />
                {{ item.name }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="flex flex-col md:flex-row justify-between mb-5">
        <!-- Pricing Section -->
        <div class="rounded-lg w-full mb-4 md:mb-0">
          <h3 class="text-[#929A9E] font-medium text-xl mb-4">Pricing</h3>
          <ul>
            <li>
              <a href="/pricing" class="gradient-hover text-[#BEC0C2] font-normal text-base">
                <TextGradient textGradientColor="" /> View Plans
              </a>
            </li>
          </ul>
        </div>

        <!-- GitHub Stats Section -->
        <div class="flex items-center space-x-2 w-full md:w-auto">
          <GithubButton href="https://github.com/openobserve/openobserve" data-color-scheme="" data-size="large"
            data-show-count="true" aria-label="Star openobserve/openobserve on GitHub">Star</GithubButton>

          <GithubButton href="https://github.com/openobserve/openobserve/fork" data-color-scheme="" data-size="large"
            data-show-count="true" aria-label="Fork openobserve/openobserve on GitHub">Fork</GithubButton>
        </div>
      </div>

      <!-- Bottom Section -->
      <div
        class="border-t border-gray-700 pt-5 flex flex-col gap-4 md:flex-row justify-between items-center text-[#FFFFFF]">
        <!-- Copyright -->
        <div class="flex items-center">
          <div class="flex flex-row items-center space-x-4 md:mb-0 font-normal text-sm">
            <p class="text-base">
              <TextGradient textGradientColor="" />{{
                footerData?.copyright?.text
              }}
            </p>
          </div>
        </div>
        <div class="flex items-center gap-6">
          <a href="/terms-of-service" class="text-base gradient-hover">
            <TextGradient textGradientColor="" />{{ footerData?.tos?.text }}
          </a>
          <a href="/privacy-policy" class="text-base gradient-hover">
            <TextGradient textGradientColor="" />{{ footerData?.pp?.text }}
          </a>
        </div>
        <div class="flex items-center space-x-4">
          <!-- Social Links -->
          <div class="social-links flex space-x-4">
            <div class="flex items-center space-x-4">
              <!-- <a href="/" class="flex items-center rounded-md p-2 hover:">
                <img src="/Slack.svg" class="w-8 h-8" />
              </a> -->
              <a href="https://join.slack.com/t/zincobserve/shared_invite/zt-11r96hv2b-UwxUILuSJ1duzl_6mhJwVg"
                target="_blank"
                class="w-12 h-12 rounded-md bg-[url('/slack.svg')] bg-cover bg-center group transition-all duration-300 hover:bg-[url('/SlackHover.svg')]">
              </a>
              <a href="https://twitter.com/OpenObserve" target="_blank"
                class="w-12 h-12 rounded-md bg-[url('/twitter.svg')] bg-cover bg-center group transition-all duration-300 hover:bg-[url('/TwitterHover.svg')]">
              </a>
              <a href="https://www.linkedin.com/company/openobserve" target="_blank"
                class="w-12 h-12 rounded-md bg-[url('/Linkedin.svg')] bg-cover bg-center group transition-all duration-300 hover:bg-[url('/LinkedinHover.svg')]">
              </a>
              <a href="https://github.com/openobserve/openobserve" target="_blank"
                class="w-12 h-12 rounded-md bg-[url('/GitHub.svg')] bg-cover bg-center group transition-all duration-300 hover:bg-[url('/GitHubHover.svg')]">
              </a>
              <a href="https://www.youtube.com/@openobserve" target="_blank"
                class="w-12 h-12 rounded-md bg-[url('/youtube.svg')] bg-cover bg-center group transition-all duration-300 hover:bg-[url('/YoutubeHover.svg')]">
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- </CustomSection> -->
  </div>
</template>
<style scoped>
.gradient-hover {
  display: inline-block;
}

/* .gradient-hover:hover {
  background: linear-gradient(to left,
      rgb(var(--blue-light)),
      rgb(var(--blue-dark)));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
} */
.gradient-hover:hover {
  background: linear-gradient(to left, #09E6FF, #00FFC3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
