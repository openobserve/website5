<script setup>
import { ref, defineProps } from "vue";

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
  <div
    class="flex flex-col items-center gap-6 w-full pb-10 px-6 lg:px-12 container mx-auto"
  >
    <!-- Card 1 (Top Section) -->
    <div class="w-full rounded-lg card">
      <a :href="props.unifiedObservability?.buttonLink">
        <div class="card-content text-center">
          <h2
            class="text-lg sm:text-xl font-bold text-white mb-2 heading-stroke cursor-pointer py-2"
          >
            {{ props?.unifiedObservability?.title }}
          </h2>

          <p class="text-sm sm:text-base font-medium text-[#BEC0C2] mb-4">
            {{ props?.unifiedObservability?.description }}
          </p>

          <div
            v-if="props.unifiedObservability?.buttonLink"
            class="text-center"
          >
            <a
              :href="props.unifiedObservability?.buttonLink"
              class="text-[#1C99FF] text-xs sm:text-sm font-bold transition-colors duration-300"
            >
              {{ props.unifiedObservability?.buttonText }}
            </a>
          </div>
        </div>
      </a>
    </div>

    <!-- Cards Grid (Middle Section - Card 2) -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
      <div v-for="(item, index) in items" :key="index" class="card">
        <div class="card-content-without-hover text-center">
          <h2 class="text-lg sm:text-xl text-white font-bold py-2">
            {{ item?.title }}
          </h2>
          <p class="text-sm sm:text-base text-[#BEC0C2] font-medium mt-3">
            {{ item?.description }}
          </p>
        </div>
      </div>
    </div>

    <!-- Card 3 (Bottom Section) -->
    <div class="w-full">
      <a :href="integrations?.buttonLink">
        <div class="card">
          <div class="card-content text-center">
            <h2
              class="text-lg sm:text-xl font-bold text-white mb-2 cursor-pointer py-2"
            >
              {{ integrations?.title }}
            </h2>

            <p class="text-sm sm:text-base text-[#BEC0C2] font-medium mb-4">
              {{ integrations?.description }}
            </p>

            <div v-if="integrations?.buttonLink" class="text-center">
              <a
                :href="integrations?.buttonLink"
                class="text-[#1C99FF] text-xs sm:text-sm font-bold transition-colors duration-300"
              >
                {{ integrations?.buttonText }}
              </a>
            </div>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<style scoped>
/* Card Styling */
.card {
  position: relative;
  padding: 0.0625rem;
  border: 1px solid #484c53;
  border-radius: 12px;
}

/* Inner Content */
.card-content {
  position: relative;
  z-index: 1;
  padding: 24px;
  background: rgb(19, 18, 25);
  border-radius: 10px;
  transition: background 0.3s ease-in-out;
  height: 100%;
}
.card-content-without-hover {
  position: relative;
  z-index: 1;
  padding: 24px;
  background: rgb(19, 18, 25);
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
