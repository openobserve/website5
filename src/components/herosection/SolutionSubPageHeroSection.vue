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
  mobileBgImage: {
    type: String,
    required: false,
  },
  mobileRightImage: {
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
    <div v-if="mobileBgImage" class="md:hidden absolute inset-0 bg-cover bg-center"
      :style="{ backgroundImage: `url(${mobileBgImage})` }"></div>

    <section class="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-11 py-10 relative flex flex-col h-full">
      <!-- Right image for desktop (overlayed) -->
      <CustomImage v-if="rightImage" class="right-overlay-image hidden lg:block" :src="rightImage"
        :alt="altText || 'Overlay Image'" />

      <div class="flex lg:w-1/2 flex-col lg:flex-row items-center gap-6 relative py-16 flex-1">
        <div class="w-full flex-1 mx-auto flex flex-col items-center lg:items-start text-center lg:text-left space-y-5">            
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

      <!-- Mobile-only right image placed at bottom -->
      <div v-if="mobileRightImage" class="md:hidden w-full mt-auto self-end">
        <CustomImage class="w-full" :src="mobileRightImage" :alt="altText || 'Overlay Image'" />
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
  top: 45%;
  transform: translateY(-50%);
  height: 100%;
  max-width: 50%;
  object-fit: contain;
  z-index: 2;
  pointer-events: none;
}

@media (max-width: 768px) {
  .hero-image {
    min-height: 100vh;
    align-items: flex-start;
  }

  section {
    min-height: 100vh;
    padding-bottom: 0;
  }

  .container {
    height: 100%;
  }
}
</style>