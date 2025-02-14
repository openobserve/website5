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
}

const props = defineProps<{
  tiers: PricingTier[];
}>();
</script>

<template>
  <div class="w-full container mx-auto ">
    <!-- Pricing Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        v-for="(tier, index) in tiers"
        :key="index"
        class="w-full rounded-lg p-2.5 border border-gray-800/50 flex flex-col"
      >
        <!-- Tier Header -->
        <div class="mb-6 text-center">
          <h3 class="t-color text-2xl md:text-3xl font-semibold mb-4">
            {{ tier.title }}
          </h3>
          <h4 class="text-white text-md md:text-lg font-medium">
            {{ tier.subTitle }}
          </h4>
          <p class="text-gray-400 text-xs md:text-sm pt-4">
            {{ tier.description }}
          </p>
        </div>

        <!-- Features List -->
        <div class="flex-grow">
          <ul class="space-y-2 md:space-y-4 mb-8">
            <li
              v-for="(feature, featureIndex) in tier.features"
              :key="featureIndex"
              class="flex items-center gap-3 text-gray-300"
            >
              <span class="flex-shrink-0">
                <img
                  src="/img/bg/icon/Frame-11216.svg"
                  alt="icon"
                  class="w-5 md:w-6 h-5 md:h-6"
                />
              </span>
              <span class="text-sm">{{ feature.title }}</span>
            </li>
          </ul>
          <p class="text-gray-400 text-xs md:text-sm text-center">
            {{ tier.bottomDescription }}
          </p>
        </div>
        <!-- Action Button -->
        <div class="text-center w-full mt-6">
          <!-- @click="tier.buttonAction" -->
          <div class="hidden lg:block place-items-center">
            <CustomButton
              variant="pricing"
              :button-link="tier.primaryButton.link"
              class="transition-all duration-200"
              :target="tier.primaryButton.target"
            >
              {{ tier.primaryButton.text }}
            </CustomButton>
          </div>
          <div class="lg:hidden">
            <CustomButton
              variant="secondary"
              size="small"
              class="transition-all duration-200"
              :button-link="tier.primaryButton.link"
              :target="tier.primaryButton.target"
            >
              {{ tier.primaryButton.text }}
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
