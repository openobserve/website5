<script setup lang="ts">
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
  buttonAction?: () => void;
}

const props = defineProps<{
  tiers: PricingTier[];
}>();
</script>

<template>
  <div class="w-full max-w-7xl mx-auto px-4 py-16">
    <!-- Header Tabs -->
    <div class="grid grid-cols-2 text-center text-white mb-8">
      <div class="bg-gradient-to-r from-blue-600 to-blue-400 py-4 rounded-tl-lg text-lg font-medium">
        Cloud
      </div>
      <div class="bg-gradient-to-r from-gray-800 to-gray-900 py-4 rounded-tr-lg text-lg font-medium">
        Self-Hosted
      </div>
    </div>

    <!-- Pricing Cards -->
    <div class="grid md:grid-cols-3 gap-6">
      <div 
        v-for="(tier, index) in tiers" 
        :key="index"
        class="bg-[#0A0A0A] rounded-lg p-8 border border-gray-800/50 flex flex-col"
      >
        <!-- Tier Header -->
        <div class="mb-6">
          <h3 class="text-blue-400 text-xl font-semibold mb-4">{{ tier.name }}</h3>
          <h4 class="text-white text-lg font-medium mb-3">{{ tier.title }}</h4>
          <p class="text-gray-400 text-sm">{{ tier.description }}</p>
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
                <svg
                  class="w-5 h-5 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </span>
              <span class="text-sm">{{ feature.text }}</span>
            </li>
          </ul>
        </div>

        <!-- Action Button -->
        <button
          @click="tier.buttonAction"
          class="w-full py-3 px-6 rounded-lg text-center text-sm font-medium transition-all duration-200"
          :class="[
            index === 0 ? 'bg-white text-black hover:bg-gray-100' : 
            index === 1 ? 'bg-blue-500 text-white hover:bg-blue-600' :
            'bg-gray-800 text-white hover:bg-gray-700'
          ]"
        >
          {{ tier.buttonText }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Optional: Add custom animations or transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}
</style>