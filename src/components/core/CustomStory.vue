<script setup>
import CustomImage from "./CustomImage.vue";
import CustomSection from "./CustomSection.vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  direction: {
    type: String,
    validator(value) {
      return ["left", "right"].includes(value);
    },
  },
});
</script>

<template>
  <CustomSection>
    <div :class="[
      'w-full flex flex-col-reverse md:flex-row space-y-6 md:space-y-0 md:space-x-6 items-center justify-center',
      direction === 'left' ? 'md:flex-row-reverse' : 'md:flex-row',
    ]">
      <!-- Text Content -->
      <div class="flex flex-col space-y-3 text-center md:text-left px-4 sm:px-6">
        <h2 class="text-white font-inter font-bold text-lg sm:text-xl md:text-2xl lg:text-4xl">
          {{ title }}
        </h2>
        <p class="font-inter font-medium text-xs sm:text-sm md:text-lg lg:text-xl text-white">
          {{ description }}
        </p>
      </div>

      <!-- Image Container -->
      <div class="flex items-center w-full justify-center">
        <div class="bg-gray-700 bg-opacity-50 p-3 sm:p-4 rounded-lg">
          <CustomImage v-if="image" :image="image" class="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24" />
        </div>
      </div>
    </div>
  </CustomSection>
</template>
