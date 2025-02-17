<script setup>
import { defineProps, computed } from "vue";
import CustomButton from "../core/CustomButton.vue";
import CustomImage from "../core/CustomImage.vue";

const props = defineProps({
  heading: { type: Object, required: true },
  primaryButton: { type: Object, required: false },
  secondaryButton: { type: Object, default: () => ({}) },
  backgroundImage: { type: Object, required: true },
  image: { type: String, required: true },
  bottomImage: { type: String, required: false },
  items: { type: Array, required: false },
});

const sectionStyles = computed(() => ({
  "--before-bg": `url('/Platform/SolutionSubHeroBg.svg')`,
}));
</script>

<template>
  <section
    class="relative flex flex-col items-center justify-center w-full min-h-screen bg-cover bg-no-repeat before:bg-no-repeat before:content-[''] before:absolute before:w-full before:h-full before:top-0 before:bg-right-top"
    :style="sectionStyles"
  >
    <div class="w-full px-4 md:px-8 lg:px-16 xl:px-24 py-16 z-10">
      <div
        class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12"
      >
        <!-- Content Container -->
        <div class="w-full lg:w-1/2 text-center lg:text-left">
          <h1
            class="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold text-white mb-4"
          >
            {{ heading?.title }}
          </h1>
          <p class="text-lg sm:text-xl font-medium text-gray-300 mb-6">
            {{ heading?.subtitle }}
          </p>
          <div
            class="flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4"
          >
            <CustomButton
              v-if="primaryButton"
              variant="primary"
              :buttonLink="primaryButton?.link"
              target="_blank"
              class="w-full sm:w-auto"
            >
              {{ primaryButton.text }}
            </CustomButton>
            <CustomButton
              v-if="secondaryButton"
              variant="secondary"
              :buttonLink="secondaryButton?.link"
              class="w-full sm:w-auto"
            >
              {{ secondaryButton.text }}
            </CustomButton>
          </div>
        </div>

        <!-- Right Image Container -->
        <div class="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <CustomImage
            :image="image"
            altText="Right visual"
            class="max-w-full w-[80%] lg:w-auto h-auto rounded-md object-contain opacity-90 lg:opacity-100"
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
