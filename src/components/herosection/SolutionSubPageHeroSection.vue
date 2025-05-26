<script setup lang="ts">
import CustomButton from "../core/CustomButton.vue";
import CustomImage from "../core/CustomImage.vue";

const props = defineProps({
  pageTag: String,
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  bgImage: {
    type: String,
    required: true,
  },
  rightImage: String,
  altText: String,
  primaryButton: {
    type: Object,
    required: true,
  },
  secondaryButton: Object,
  mobileBgImage: String,
  mobileRightImage: String,
});
</script>

<template>
  <div class="relative w-full min-h-[70vh] flex items-center overflow-hidden">
    <!-- Background Image -->
    <div class="absolute inset-0 z-0">
      <!-- Desktop Background -->
      <div class="hidden lg:block w-full h-full bg-cover bg-no-repeat bg-center"
        :style="{ backgroundImage: `url(${bgImage})` }">
      </div>

      <!-- Mobile Background -->
      <div v-if="mobileBgImage" class="lg:hidden w-full h-full bg-cover bg-center"
        :style="{ backgroundImage: `url(${mobileBgImage})` }"></div>
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
            <CustomButton :variant="primaryButton.variant" size="medium" :buttonText="primaryButton.text"
              :buttonLink="primaryButton.link" />
            <CustomButton v-if="secondaryButton" :variant="secondaryButton.variant" size="medium"
              :buttonText="secondaryButton.text" :buttonLink="secondaryButton.link" />
          </div>
        </div>

        <!-- Right Image -->
        <div class="w-full lg:w-1/2 mt-8 sm:mt-10 lg:mt-0 flex justify-center lg:justify-end">
          <!-- Desktop/laptop image -->
          <div v-if="rightImage" class="hidden lg:block w-full max-w-[90%] h-auto">
            <CustomImage class="w-full h-full object-contain max-h-[50vh]" :src="rightImage"
              :alt="altText || 'Overlay Image'" />
          </div>

          <!-- Mobile/tablet image -->
          <div v-if="mobileRightImage" class="block lg:hidden w-full max-w-[70%] sm:max-w-[300px] h-auto">
            <CustomImage class="w-full h-full object-contain opacity-80" :src="mobileRightImage"
              :alt="altText || 'Overlay Image'" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>