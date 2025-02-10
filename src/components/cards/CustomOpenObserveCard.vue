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

<template>
  <!-- <CustomSection> -->
  <div
    class="flex flex-col items-center gap-6 w-full pb-10 px-6 lg:px-12 container mx-auto"
  >
    <!-- Card 1 (Top Section) -->
    <div class="w-full rounded-lg card">
      <div class="card-content">
        <h2 class="text-2xl font-bold text-white mb-2 text-center heading-stroke">
          {{ props?.unifiedObservability?.title }}
        </h2>
        <p class="text-base font-medium text-[#BEC0C2] mb-4 text-center">
          {{ props?.unifiedObservability?.description }}
        </p>
        <div class="text-center">
          <a
            :href="unifiedObservability?.buttonLink"
            class="text-[#1C99FF] text-sm font-bold transition-colors duration-300"
          >
            {{ unifiedObservability?.buttonText }}
          </a>
        </div>
      </div>
    </div>

    <!-- Cards Grid (Middle Section) -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
      <div v-for="(item, index) in items" :key="index" class="card">
        <div class="card-content">
          <div class="text-white text-2xl text-center font-bold">
            {{ item?.title }}
          </div>
          <div class="text-[#BEC0C2] text-base text-center font-medium mt-3">
            {{ item?.description }}
          </div>
        </div>
      </div>
    </div>

    <!-- Card 2 (Bottom Section) -->
    <div class="w-full">
      <div class="card">
        <div class="card-content">
          <h2 class="text-2xl font-bold text-white mb-2 text-center">
              {{ integrations?.title }}
          </h2>
          <p class="text-base text-[#BEC0C2] font-medium mb-4 text-center">
            {{ integrations?.description }}
          </p>
          <div class="text-center">
            <a
              :href="integrations?.buttonLink"
              class="text-[#1C99FF] text-sm font-bold transition-colors duration-300"
            >
              {{ integrations?.buttonText }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- </CustomSection> -->
</template>

<style scoped>
/* Card Styling */
.card {
  position: relative;
  padding: 0.0625rem;
  border-radius: 12px;
}

/* Gradient Border Effect */
.card::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 12px;
  padding: 0.5px;
  background: linear-gradient(180deg, #ffffff, #a7a6a6);
  -webkit-mask-composite: exclude;
  mask-composite: exclude;
  pointer-events: none;
}

/* Inner Content */
.card-content {
  position: relative;
  z-index: 1;
  padding: 24px;
  background: black;
  border-radius: 10px;
  transition: background 0.3s ease-in-out;
  height: 100%;
}

.card:hover .card-content {
  background: rgba(31, 34, 37, 0.95);
}

.heading-stroke {
  stroke-width: 1px;
  stroke: rgba(255, 255, 255, 0.4);
}
</style>
