<script setup>
import { defineProps, computed } from "vue";
import CustomButton from "../core/CustomButton.vue";
import CustomImage from "../core/CustomImage.vue";

// Define props for the component
const props = defineProps({
  heading: {
    type: Object,
    required: true,
  },
  primaryButton: {
    type: Object,
    required: false,
  },
  secondaryButton: {
    type: Object,
    default: () => ({}),
  },
  backgroundImage: {
    type: Object,
    required: true, // URL of the SVG or background image
  },
  image: {
    type: String,
    required: true, // URL of the right-side image
  },
  bottomImage: {
    type: String,
    required: false,
  },
  items: {
    type: Array,
    required: false,
  },
});

const sectionStyles = computed(() => ({
  "--before-bg": `url('/Platform/SolutionSubHeroBg.svg')`,
}));
</script>

<template>
  <section
    class="relative flex flex-col items-center justify-end px-4 max-w-full min-h-[40vh] before:content-[''] before:absolute before:w-full before:min-h-[160vh] before:-top-28 before:bg-no-repeat before:bg-contain before:bg-right-top"
    :style="sectionStyles"
  >
    <div class="container mx-auto px-6 sm:px-10 lg:px-16 pt-20 lg:pt-0">
      <div
        class="flex flex-col lg:flex-row lg:items-center lg:h-screen lg:justify-between lg:gap-20"
      >
        <!-- Content Container -->
        <div class="relative z-30 w-full lg:w-[50%] mb-8 sm:mb-12 lg:mb-0">
          <h1 class="text-3xl sm:text-4xl md:text-5xl xl:text-7xl font-bold text-white mb-4">
            {{ heading?.title }}
          </h1>
          <p class="text-lg sm:text-xl font-medium text-gray-300 mb-8">
            {{ heading?.subtitle }}
          </p>
          <div class="flex flex-col sm:flex-row justify-start gap-4 w-full">
            <CustomButton
              variant="primary"
              class="w-full sm:w-auto"
              :buttonLink="primaryButton?.link"
              v-if="primaryButton"
            >
              {{ primaryButton.text }}
            </CustomButton>
            <CustomButton
              variant="secondary"
              class="w-full sm:w-auto"
              :buttonLink="secondaryButton?.link"
              v-if="secondaryButton"
            >
              {{ secondaryButton.text }}
            </CustomButton>
          </div>
        </div>

        <!-- Right Image Container -->
        <div
          class="relative py-4 lg:absolute lg:right-0 lg:top-1/2 lg:transform lg:-translate-y-1/2 w-full lg:w-[50%] flex justify-center lg:justify-end items-center z-20 mt-8 sm:mt-12 lg:mt-0"
        >
          <CustomImage
            :image="image"
            altText="Right visual"
            cssClass="w-[90%] lg:w-auto max-w-full h-auto rounded-md object-contain opacity-90 lg:opacity-100"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
section::before {
  background-image: var(--before-bg);
}
</style>