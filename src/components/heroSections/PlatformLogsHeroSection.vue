<script setup>
import { computed } from "vue";
import CustomButton from "../core/CustomButton.vue";
import CustomImage from "../core/CustomImage.vue";

// Define props with default values where needed
const props = defineProps({
  heading: {
    type: Object,
    required: true,
  },
  primaryButton: {
    type: Object,
    required: true,
  },
  secondaryButton: {
    type: Object,
    default: () => ({}),
  },
  backgroundImage: {
    type: Object,
    default: () => ({ url: "/img/bg/gradient-bg/PlatformSubHeroBg.svg" }),
  },
  image: {
    type: String,
    required: true,
  },
  bottomImage: {
    type: String,
    default: null,
  },
  items: {
    type: Array,
    default: () => [],
  },
});

// Computed property for setting background image
const sectionStyles = computed(() => ({
  "--before-bg": `url('${props.backgroundImage?.url || ""}')`,
}));
</script>

<template>
  <section
    class="relative flex flex-col items-center justify-end px-4 max-w-full min-h-[10rem] before:z-0 before:content-[''] before:absolute before:w-full before:min-h-[160vh] before:-top-40 xxl:before:-top-96 before:bg-no-repeat before:bg-cover before:bg-[50%_40vh] xl:before:bg-[50%_40vh]"
    :style="sectionStyles">
    <div class="container mx-auto px-3 md:px-10 lg:px-16 pt-14 lg:pt-3">
      <div
        class="flex flex-col lg:flex-row lg:items-center lg:min-h-[20rem] xl:min-h-[30rem] lg:justify-between lg:gap-20 md:pr-[2vh]">
        <!-- Left: Content Section -->
        <div class="relative z-30 w-full lg:w-[50%] mb-8 sm:mb-4 lg:mb-0 md:pr-[2vh]">
          <h1 class="text-2xl sm:text-3xl md:text-4xl xl:text-7xl font-bold text-white mb-4">
            {{ heading?.title }}
          </h1>
          <p class="text-base md:text-lg font-medium text-gray-300 mb-8">
            {{ heading?.subtitle }}
          </p>
          <div class="flex flex-col sm:flex-row justify-start gap-4">
            <CustomButton variant="primary" class="w-full sm:w-auto" :buttonLink="primaryButton.link" target="_blank">
              {{ primaryButton.text }}
            </CustomButton>
            <CustomButton v-if="secondaryButton?.text && secondaryButton?.link" variant="secondary"
              class="w-full sm:w-auto" :buttonLink="secondaryButton.link">
              {{ secondaryButton.text }}
            </CustomButton>
          </div>
        </div>

        <!-- Right: Image Section -->
        <div
          class="relative py-4 lg:absolute lg:right-0 lg:top-1/2 lg:transform lg:-translate-y-1/2 w-full lg:w-[50%] flex justify-center lg:justify-end items-center z-20 lg:mt-4">
          <CustomImage :image="image"
            cssClass="w-full lg:w-auto max-w-full h-auto rounded-md object-contain opacity-90 lg:opacity-100" />
        </div>
      </div>
    </div>

    <!-- Bottom Image (Optional) -->
    <div v-if="bottomImage" class="absolute -bottom-[50px] lg:bottom-16 left-0 w-full flex justify-center z-50">
      <CustomImage :image="bottomImage" altText="Bottom decoration"
        cssClass="w-[85%] sm:w-[75%] md:w-2/3 object-contain" />
    </div>
  </section>
</template>

<style scoped>
section::before {
  background-image: var(--before-bg);
}
</style>
