<script setup>
import { defineProps } from "vue";
import CustomSection from "../core/CustomSection.vue";

const props = defineProps({
  unifiedObservability: {
    type: Object,
    required: true,
  },
  items: {
    type: Array,
    required: true,
    default: () => [],
  },
  integrations: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.hover\:bg-\[\#1F2225\]:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.cardShadow:hover {
  box-shadow: 0 0 60px 0 rgba(66, 174, 255, 0.8);
  /* Shadow effect */
  border-radius: 0.5rem;
}
</style>

<template>
    <CustomSection>
    <div class="flex flex-col items-center gap-4 w-full px-6 lg:px-12 container mx-auto">
      
      <!-- Card 1 (Top Section) -->
      <div class="w-full">
        <div class="p-6 bg-[#1A1D1F] rounded-lg shadow-md  bg-gradient-gray transition-all duration-300 hover:bg-[#1F2225]">
          <h2 class="text-2xl font-bold text-white mb-2 text-center">{{ props?.unifiedObservability?.title }}</h2>
          <p class="text-base font-medium text-[#BEC0C2] mb-4 text-center">{{ props?.unifiedObservability?.description }}</p>
          <div class="text-center">
            <a :href="unifiedObservability?.buttonLink" class="text-[#1C99FF] text-sm font-bold transition-colors duration-300">
              {{ unifiedObservability?.buttonText }}
            </a>
          </div>
        </div>
      </div>
  
      <!-- Cards Grid (Middle Section) -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <div
          v-for="(item, index) in items"
          :key="index"
          class="rounded-lg w-full p-6 shadow-md bg-gradient-gray gap-3 transition-all duration-200 hover:shadow-md"
        >
          <!-- Card Content -->
          <div class="text-white text-2xl text-center font-bold">
          {{ item?.title }}
        </div>
        <div class="text-[#BEC0C2] text-base text-center font-medium mt-3">
          {{ item?.description }}
        </div>

        </div>
      </div>
  
      <!-- Card 2 (Bottom Section) -->
      <div class="w-full ">
        <div class="p-6 bg-[#1A1D1F] rounded-lg bg-gradient-gray shadow-md transition-all duration-300 hover:bg-[#1F2225]">
          <h2 class="text-2xl font-bold text-white mb-2 text-center">{{ integrations?.title }}</h2>
          <p class="text-base text-[#BEC0C2] font-medium mb-4 text-center">{{ integrations?.description }}</p>
          <div class="text-center">
            <a :href="integrations?.buttonLink" class="text-[#1C99FF] text-sm font-bold  transition-colors duration-300">
              {{ integrations?.buttonText }}
            </a>
          </div>
        </div>
      </div>
      
    </div>
</CustomSection>
  </template>

