<script setup lang="ts">
import CustomButton from "../core/CustomButton.vue";
import CustomImage from "../core/CustomImage.vue";

const props = defineProps({
  pageTag: {
    type: String,
    required: false,
  },
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
  rightImage: {
    type: String,
    required: false,
  },
  altText: {
    type: String,
    required: false,
  },
  primaryButton: {
    type: Object,
    required: true,
  },
  secondaryButton: {
    type: Object,
    required: false,
  },
  mobileImage: {
    type: String,
    required: false,
  },
});
</script>

<template>
  <div class="w-full hero-image">
    <!-- Desktop background image (hidden on mobile) -->
    <div v-if="bgImage" class="hidden md:block absolute inset-0 bg-cover bg-center"
      :style="{ backgroundImage: `url(${bgImage})` }"></div>

    <!-- Mobile background image (hidden on desktop) -->
    <div v-if="mobileImage" class="md:hidden absolute inset-0 bg-cover bg-center"
      :style="{ backgroundImage: `url(${mobileImage})` }"></div>

    <section class="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-11 py-10 relative">
      <!-- Right side overlay image (hidden on mobile) -->
      <CustomImage v-if="rightImage" class="right-overlay-image hidden md:block" :src="rightImage"
        :alt="altText || 'Overlay Image'" />

      <div class="flex lg:w-1/2 flex-col lg:flex-row items-center gap-6 relative py-16">
        <div class="w-full flex-1 mx-auto flex flex-col items-center lg:items-start text-center lg:text-left space-y-5">
          <div class="w-fit flex items-center justify-center rounded-3xl bg-gray-300/80 py-1 px-4">
            <h2 class="text-sm font-semibold text-black text-center capitalize">
              {{ pageTag }}
            </h2>
          </div>
          <h1 class="text-3xl lg:text-5xl font-bold text-black">
            {{ title }}
          </h1>
          <p class="text-black text-base md:text-xl">
            {{ description }}
          </p>
          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <CustomButton :variant="primaryButton.variant" size="medium" :buttonText="primaryButton.text"
              :buttonLink="primaryButton.link" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero-image {
  position: relative;
  overflow: hidden;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 500px;
  /* Adjust as needed */
}

/* Right side overlay image */
.right-overlay-image {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 100%;
  max-width: 50%;
  object-fit: contain;
  z-index: 2;
  pointer-events: none;
}

@media (max-width: 768px) {
  .hero-image {
    min-height: 80vh;
  }
}
</style>