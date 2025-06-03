<script setup lang="ts">
import CustomButton from "../core/CustomButton.vue";
import CustomImage from "../core/CustomImage.vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  primaryButton: {
    type: Object,
    required: true,
  },
  bgImageForLaptop: {
    type: String,
    required: true,
  },
  bgImageForMobile: {
    type: Object,
    required: true,
  },
  Image: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="relative w-full min-h-[55vh] flex items-center overflow-hidden">
    <!-- Background Image -->
    <div class="absolute inset-0 z-0">
      <!-- Desktop Background -->
      <div class="hidden lg:block w-full h-full bg-cover bg-no-repeat bg-center"
        :style="{ backgroundImage: `url(${bgImageForLaptop?.url})` }">
      </div>

      <!-- Mobile Background -->
      <div v-if="bgImageForMobile" class="lg:hidden w-full h-full bg-cover bg-center"
        :style="{ backgroundImage: `url(${bgImageForMobile?.url})` }"></div>
    </div>

    <!-- Content Container -->
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-11 relative z-10">
      <div class="flex flex-col lg:flex-row items-center py-10 lg:py-0">
        <!-- Left Content -->
        <div
          class="w-full lg:w-1/2 space-y-4 lg:space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start">
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-black">
            {{ title }}
          </h1>
          <p class="text-black text-base sm:text-lg lg:text-xl max-w-xl">
            {{ description }}
          </p>
          <div class="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 sm:gap-4">
            <CustomButton variant="primary" size="medium" :buttonText="primaryButton.text"
              :buttonLink="primaryButton.link" :target="primaryButton?.target"/>
          </div>
        </div>

        <!-- Right Image -->
        <div class="w-full lg:w-1/2 mt-8 sm:mt-10 lg:mt-0 flex justify-center lg:justify-end">
          <!-- Desktop/laptop image -->
          <!-- <div v-if="Image" class="hidden lg:block w-full max-w-[90%] h-auto">
            <CustomImage class="w-full h-full object-contain max-h-[50vh]" :src="Image"
              :alt="title || 'Overlay Image'" />
          </div> -->

          <!-- Mobile/tablet image -->
          <div v-if="Image" class="block lg:hidden w-full max-w-[70%] sm:max-w-[300px] h-auto">
            <CustomImage class="w-full h-full object-contain opacity-80" :src="Image?.url"
              :alt="title || 'Overlay Image'" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>