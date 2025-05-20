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
  <div
    class="w-full bg-no-repeat"
    :style="{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }"
  >
    <!-- Mobile background override -->
    <div
      v-if="mobileBgImage"
      class="md:hidden w-full h-full  inset-0 z-[-1]"
      :style="{ backgroundImage: `url(${mobileBgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }"
    ></div>

    <section class="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-11 flex flex-col md:flex-row items-center">
      <!-- Left Content -->
      <div class="w-full md:w-1/2 space-y-5 text-center md:text-left flex flex-col items-center md:items-start">
        <h1 class="text-3xl lg:text-5xl font-bold text-black">
          {{ title }}
        </h1>
        <p class="text-black text-base md:text-xl">
          {{ description }}
        </p>
        <div class="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
          <CustomButton
            :variant="primaryButton.variant"
            size="medium"
            :buttonText="primaryButton.text"
            :buttonLink="primaryButton.link"
          />
          <CustomButton
            v-if="secondaryButton"
            :variant="secondaryButton.variant"
            size="medium"
            :buttonText="secondaryButton.text"
            :buttonLink="secondaryButton.link"
          />
        </div>
      </div>

      <!-- Right Image -->
      <div class="w-full md:w-1/2 mt-10 md:mt-0 flex justify-center md:justify-end">
        <CustomImage
          v-if="rightImage"
          class="max-w-full h-auto object-contain"
          :src="rightImage"
          :alt="altText || 'Overlay Image'"
        />
        <CustomImage
          v-else-if="mobileRightImage"
          class="block md:hidden max-w-full h-auto object-contain"
          :src="mobileRightImage"
          :alt="altText || 'Overlay Image'"
        />
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Optional: Additional styles can be added here */
</style>
