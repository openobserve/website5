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
  <div class="w-full max-w-7xl mx-auto px-4 ">
    <!-- Pricing Cards -->
    <div class="grid md:grid-cols-3 gap-6">
      <div
        v-for="(tier, index) in tiers"
        :key="index"
        class="rounded-lg p-8 border border-gray-800/50 flex flex-col"
      >
        <!-- Tier Header -->
        <div class="mb-6 text-center">
          <h3 class="t-color text-4xl font-semibold mb-4">
            {{ tier.name }}
          </h3>
          <h4 class="text-white text-xl font-medium py-5">{{ tier.title }}</h4>
          <p class="text-gray-400 text-sm py-5">{{ tier.description }}</p>
        </div>

        <!-- Features List -->
        <div class="flex-grow">
          <ul class="space-y-4 mb-8">
            <li
              v-for="(feature, featureIndex) in tier.features"
              :key="featureIndex"
              class="flex items-center gap-3 text-gray-300"
            >
              <span class="flex-shrink-0">
                <img
                  src="/resources/Frame-11216.svg"
                  alt="icon"
                  class="w-6 h-6"
                />
              </span>
              <span class="text-sm">{{ feature.text }}</span>
            </li>
          </ul>
        </div>

        <!-- Action Button -->
        <!-- @click="tier.buttonAction" -->
        <div class="text-center">
          <CustomButton
            variant="pricing"
            class="px-6 transition-all duration-200"
            :button-link="tier.buttonAction"
            :target="tier.target"
          >
            {{ tier.buttonText }}
          </CustomButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.t-color {
  background: linear-gradient(
    264deg,
    #76dbff -14.95%,
    #37a1e2 33.11%,
    #0e7bcf 107.25%,
    #005eac 121.85%
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
