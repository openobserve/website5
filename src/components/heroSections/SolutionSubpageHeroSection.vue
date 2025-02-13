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
    class="relative container mx-auto flex flex-col items-center justify-end px-4 max-w-full min-h-[40vh] before:content-[''] before:absolute before:w-full before:min-h-full md:before:min-h-[160vh] before:top-20 md:before:-top-28 before:bg-no-repeat before:bg-cover md:before:bg-contain  before:bg-right-top"
    :style="sectionStyles"
  >
    <div class=" md: px-6 lg:px-16 pt-20 lg:pt-0 z-10">
      <div
        class="flex flex-col lg:flex-row lg:items-center lg:h-screen lg:justify-between lg:gap-20"
      >
        <!-- Content Container -->
        <div class="relative z-30 w-full lg:w-[50%] mb-8 sm:mb-12 lg:mb-0">
          <h1
            class="text-3xl sm:text-4xl md:text-5xl xl:text-7xl font-bold text-white mb-4"
          >
            {{ heading?.title }}
          </h1>
          <p class="text-lg sm:text-xl font-medium text-gray-300 mb-8">
            {{ heading?.subtitle }}
          </p>
          <div class="flex items-center flex-col sm:flex-row gap-4">
            <CustomButton
              variant="primary"
              :buttonLink="primaryButton?.link"
              v-if="primaryButton"
              class="w-full sm:w-auto"
            >
              {{ primaryButton.text }}
            </CustomButton>
            <CustomButton
              variant="secondary"
              :buttonLink="secondaryButton?.link"
              v-if="secondaryButton"
              class="w-full sm:w-auto"
            >
              {{ secondaryButton.text }}
            </CustomButton>
          </div>
        </div>

        <!-- Right Image Container -->
        <div
          class="relative py-4 lg:absolute lg:right-0 lg:top-1/2 lg:transform lg:-translate-y-1/2 w-full lg:w-[50%] flex justify-center lg:justify-end items-center z-20"
        >
          <CustomImage
            :image="image"
            altText="Right visual"
            cssClass="w-full lg:w-auto max-w-full h-auto rounded-md object-contain opacity-90 lg:opacity-100"
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
