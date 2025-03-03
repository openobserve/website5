<script setup lang="ts">
import CustomButton from "../core/CustomButton.vue";

interface Feature {
  title: string;
  included: boolean;
}

interface PricingTier {
  title: string;
  subTitle: string;
  description: string;
  features: Feature[];
  primaryButton: {
    text: string;
    link: string;
    target: string;
  };
  bottomDescription: string;
  enterpriseTitle: String;
  enterpriseDescription: String;
  enterpriseFeatures: Feature[];
  demoButton: {
    text: string;
    link: string;
    target: string;
  };
}

const props = defineProps<{
  tiers: PricingTier[];
}>();
</script>

<template>
  <div class="w-full container mx-auto flex flex-col items-center">
    <div class="p-2.5 border border-gray-700/50 rounded-lg w-full">
      <div class="grid grid-cols-1 gap-10">
        <!-- Column 1 -->
        <div class="flex flex-col items-center text-center">
          <p class="text-white text-md md:text-lg pt-4">
            {{ tiers.enterpriseTitle }}
          </p>
          <h4 class="text-gray-400 text-xs md:text-sm mt-3 font-medium">
            {{ tiers.enterpriseDescription }}
          </h4>

          <!-- Features List -->
          <ul
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 w-[70%]"
          >
            <li
              v-for="(feature, featureIndex) in tiers.enterpriseFeatures"
              :key="featureIndex"
              class="flex items-center gap-3 text-gray-300"
            >
              <img
                src="/img/icon/RightTick.svg"
                alt="icon"
                class="w-4 md:w-5 h-4 md:h-5"
              />
              <span class="text-sm text-left">{{ feature.title }}</span>
            </li>
          </ul>

          <p class="text-gray-400 text-xs md:text-sm mt-3">
            {{ tiers.bottomDescription }}
          </p>

          <!-- Action Button -->
          <div class="mt-6">
            <CustomButton
              v-if="tiers?.demoButton?.link"
              variant="primary"
              :button-link="tiers.demoButton.link"
              class="transition-all duration-200"
              :target="tiers.demoButton.target"
            >
              {{ tiers.demoButton.text }}
            </CustomButton>
          </div>
        </div>

        <!-- Column 2 -->
        <div class="flex flex-col items-center text-center">
          <p class="text-white text-md md:text-lg pt-4">
            {{ tiers.subTitle }}
          </p>
          <h4 class="text-gray-400 text-xs md:text-sm mt-3 font-medium">
            {{ tiers.description }}
          </h4>

          <!-- Enterprise Features List -->
          <ul
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 w-[70%]"
          >
            <li
              v-for="(feature, featureIndex) in tiers.features"
              :key="featureIndex"
              class="flex items-center gap-3 text-gray-300"
            >
              <img
                src="/img/icon/RightTick.svg"
                alt="icon"
                class="w-4 md:w-5 h-4 md:h-5"
              />
              <span class="text-sm">{{ feature.title }}</span>
            </li>
          </ul>

          <!-- Action Button -->
          <div class="mt-6">
            <CustomButton
              v-if="tiers?.primaryButton?.link"
              variant="secondary"
              :button-link="tiers.primaryButton.link"
              class="transition-all duration-200"
              :target="tiers.primaryButton.target"
            >
              {{ tiers.primaryButton.text }}
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.t-color {
  background: linear-gradient(
    264deg,
    #ff9876 -14.95%,
    #e2a037 33.11%,
    #ff7a51 107.25%,
    #8e2705 121.85%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Optional: Add custom animations or transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}
</style>
