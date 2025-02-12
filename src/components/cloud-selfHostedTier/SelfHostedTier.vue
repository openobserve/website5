<script setup lang="ts">
import CustomButton from "../core/CustomButton.vue";

interface Feature {
  text: string;
  included: boolean;
}

interface PricingTier {
  name: string;
  title: string;
  description: string;
  features: Feature[];
  buttonText: string;
  buttonAction?: string;
  target?: string
}

const props = defineProps<{
  tiers: PricingTier[];
}>();
</script>

<template>
  <div class="w-full container mx-auto">
    <!-- Pricing Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        v-for="(tier, index) in tiers"
        :key="index"
        class="w-full rounded-lg p-2.5 border border-gray-800/50 flex flex-col items-start"
      >
        <!-- Tier Header -->
        <div class="mb-6 text-center">
          <h3 class="t-color text-2xl md:text-3xl font-semibold mb-4">
            {{ tier.name }}
          </h3>
          <h4 class="text-white text-md md:text-lg font-medium">{{ tier.title }}</h4>
          <p class="text-gray-400 text-xs md:text-sm pt-4">{{ tier.description }}</p>
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
                  src="/resources/Frame-11216.svg"
                  alt="icon"
                  class="w-5 md:w-6 h-5 md:h-6"
                />
              </span>
              <span class="text-sm">{{ feature.text }}</span>
            </li>
          </ul>
        </div>

        <!-- Action Button -->
        <div class="text-center w-full">
          <!-- @click="tier.buttonAction" -->
          <div class="hidden lg:block place-items-center">
            <CustomButton
              variant="pricing"
              :button-link="tier.buttonAction"
              class="transition-all duration-200"
              :target="tier.target"
            >
              {{ tier.buttonText }}
            </CustomButton>
          </div>
          <div class="lg:hidden">
            <CustomButton
              variant="secondary"
              size="small"
              class="transition-all duration-200"
              :button-link="tier.buttonAction"
              :target="tier.target"
            >
              {{ tier.buttonText }}
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
