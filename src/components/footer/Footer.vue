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
    <svg
      class="absolute inset-0 w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1221 684"
      fill="none"
    >
      <g filter="url(#filter0_f_1434_1855)">
        <circle
          cx="610.5"
          cy="610.5"
          r="410.5"
          fill="url(#paint0_radial_1434_1855)"
        />
      </g>
      <defs>
        <filter
          id="filter0_f_1434_1855"
          x="0"
          y="0"
          width="1221"
          height="1221"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="100"
            result="effect1_foregroundBlur_1434_1855"
          />
        </filter>
        <radialGradient
          id="paint0_radial_1434_1855"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(610.5 610.5) rotate(90) scale(410.5)"
        >
          <stop offset="0.01" stop-color="#23282C" />
          <stop offset="0.885" stop-color="#23282C" stop-opacity="0" />
        </radialGradient>
      </defs>
    </svg>
    <!-- <CustomSection> -->
    <div class="relative container mx-auto px-4 py-6 lg:px-8 xl:px-12">
      <div class="w-full flex flex-col lg:flex-row ">
        <div class="w-full lg:w-[85%]">
          <!-- Main Footer Content -->
          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 mt-12">
            <!-- First loop (show first 4 items) -->
            <div
              v-for="section in firstSections"
              :key="section.title"
              class="min-w-0"
            >
              <h2 class="text-white font-medium text-xl mb-4">
                {{ section.title }}
              </h2>

              <ul class="space-y-2">
                <li v-for="item in section.items" :key="item.text">
                  <a
                    :href="item.link"
                    :target="item.target"
                    class="gradient-hover text-gray-300 text-base transition duration-300"
                  >
                    <!-- <TextGradient textGradientColor="" /> -->
                    {{ item.text }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="w-full lg:w-[15%] flex justify-start">
          <div class="_form_3"></div>
        </div>
      </div>
      <div class="flex justify-center lg:justify-end py-5">
        <div class="flex items-center gap-6">
          <div class="w-12 h-12 flex-shrink-0">
            <img
              src="/img/soc.webp"
              class="w-full h-full object-contain grayscale"
              alt="SOC2 Type 2"
            />
          </div>

          <div class="flex flex-col text-white">
            <h2 class="text-sm sm:text-base whitespace-nowrap">SOC2 Type 2</h2>
            <p class="text-xs sm:text-sm whitespace-nowrap">Certified</p>
          </div>

          <div class="flex flex-wrap justify-center md:justify-start gap-2">
            <GithubButton
              href="https://github.com/openobserve/openobserve"
              data-color-scheme=""
              data-size="large"
              data-show-count="true"
              aria-label="Star openobserve/openobserve on GitHub"
            >
              Star
            </GithubButton>
          </div>
        </div>
      </div>
      <!-- <div
        class="flex flex-col md:flex-row justify-between items-center lg:items-end mb-5 gap-4"
      >
        <div class="w-full md:w-auto">
          <h2 class="text-white font-medium text-xl mb-4">Pricing</h2>
          <ul>
            <li>
              <a href="/pricing" class="gradient-hover text-gray-300 font-normal text-base">View Plans
              </a>
            </li>
          </ul>
        </div>

        <div
          class="flex flex-wrap items-center justify-center lg:justify-end gap-8 w-full md:w-auto"
        >
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 flex-shrink-0">
              <img
                src="/img/soc.webp"
                class="w-full h-full object-contain grayscale"
                alt="SOC2 Type 2"
              />
            </div>

            <div class="flex flex-col text-white">
              <h2 class="text-sm sm:text-base whitespace-nowrap">
                SOC2 Type 2
              </h2>
              <p class="text-xs sm:text-sm whitespace-nowrap">Certified</p>
            </div>
          </div>

          <div class="flex flex-wrap justify-center md:justify-start gap-2">
            <GithubButton
              href="https://github.com/openobserve/openobserve"
              data-color-scheme=""
              data-size="large"
              data-show-count="true"
              aria-label="Star openobserve/openobserve on GitHub"
            >
              Star
            </GithubButton>
          </div>
        </div>
      </div> -->

      <!-- Bottom Section -->
      <div
        class="border-t border-gray-700 pt-5 flex flex-col gap-5 lg:flex-row justify-between items-center text-[#FFFFFF]"
      >
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
          <a
            :href="termsOfService?.link"
            :target="termsOfService?.target"
            class="text-base gradient-hover"
          >
            {{ termsOfService?.text }}
          </a>
          <a
            :href="privacyText?.link"
            :target="privacyText?.target"
            class="text-base gradient-hover"
          >
            {{ privacyText?.text }}
          </a>
        </div>

        <div class="flex items-center space-x-4">
          <!-- Social Links -->
          <div class="social-links">
            <a
              v-for="(item, index) in socialMedia"
              :key="index"
              :href="item.link"
              :class="['icon', item.name.toLowerCase()]"
              class="icon"
              target="_blank"
            >
              <img
                :src="socialIcon(item.name)"
                class="icon-img"
                :alt="item.name + ' icon'"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
    <!-- </CustomSection> -->
  </footer>
</template>
<style scoped>
.gradient-hover {
  display: inline-block;
}

.gradient-hover:hover {
  color: #7782FF;
}

.social-links {
  display: flex;
  gap: 16px;
}

.icon {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  border-radius: 8px;
  transition: all 0.2s ease-in-out;
}

.icon-img {
  width: 24px;
  height: 24px;
}

/* Slack */
.slack {
  box-shadow: inset 0 -2px 4px rgba(202, 138, 4, 0.6),
    inset 0 2px 4px rgba(0, 0, 0, 0.2);
}

.slack:hover {
  box-shadow: inset 0 -3px 6px rgba(202, 138, 4, 0.8),
    inset 0 3px 6px rgba(0, 0, 0, 0.3);
}

/* Twitter */
.twitter {
  box-shadow: inset 0 -2px 4px rgba(255, 255, 255, 0.2),
    inset 0 2px 4px rgba(0, 0, 0, 0.2);
}

.twitter:hover {
  box-shadow: inset 0 -3px 6px rgba(255, 255, 255, 0.3),
    inset 0 3px 6px rgba(0, 0, 0, 0.3);
}

/* LinkedIn */
.linkdin {
  box-shadow: inset 0 -3px 6px rgba(3, 105, 161, 0.6),
    inset 0 2px 4px rgba(255, 255, 255, 0.2);
}

.linkdin:hover {
  box-shadow: inset 0 -4px 8px rgba(3, 105, 161, 0.8),
    inset 0 3px 6px rgba(255, 255, 255, 0.3);
}

/* GitHub */
.github {
  box-shadow: inset 0 -2px 4px rgba(255, 255, 255, 0.2),
    inset 0 2px 4px rgba(0, 0, 0, 0.2);
}

.github:hover {
  box-shadow: inset 0 -3px 6px rgba(255, 255, 255, 0.3),
    inset 0 3px 6px rgba(0, 0, 0, 0.3);
}

/* YouTube */
.youtube {
  box-shadow: inset 0 -2px 4px rgba(225, 96, 96, 0.6),
    inset 0 2px 4px rgba(0, 0, 0, 0.2);
}

.youtube:hover {
  box-shadow: inset 0 -3px 6px rgba(225, 96, 96, 0.8),
    inset 0 3px 6px rgba(0, 0, 0, 0.3);
}
</style>
