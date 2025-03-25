<script setup>
import { computed } from "vue";
import CustomButton from "../core/CustomButton.vue";
import CustomImage from "../core/CustomImage.vue";

const props = defineProps({
  heading: { type: Object, required: true },
  primaryButton: { type: Object, required: false },
  secondaryButton: { type: Object, default: () => ({}) },
  backgroundImage: { type: Object, required: false },
  image: { type: String, required: true },
  bottomImage: { type: String, required: false },
  items: { type: Array, required: false },
});

const sectionStyles = computed(() => ({
  "--before-bg": `url('/img/bg/gradient-bg/SolutionSubHeroBg.svg')`,
}));
</script>

<template>
  <section class="relative w-full h-full py-10  lg:py-0">
    <div
      class="absolute top-0 lg:-top-10 xxl:-top-96 right-0 w-full lg:w-[60%] h-screen bg-[url('/img/bg/gradient-bg/SolutionSubHeroBg.svg')] bg-cover bg-right bg-no-repeat">
    </div>
    <div class="w-full px-4 md:px-8 lg:px-16 xl:px-24 relative">
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-0 lg:gap-12">
        <!-- Content Container -->
        <div class="w-full lg:w-1/2 text-center lg:text-left">
          <h1 class="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold text-white mb-4">
            {{ heading?.title }}
          </h1>
          <p class="text-lg sm:text-xl font-medium text-gray-300 mb-6">
            {{ heading?.subtitle }}
          </p>
          <div class="flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4">
            <CustomButton v-if="primaryButton" variant="primary" :buttonLink="primaryButton?.link" target="_blank"
              class="w-full sm:w-auto">
              {{ primaryButton.text }}
            </CustomButton>
            <CustomButton v-if="secondaryButton" variant="secondary" :buttonLink="secondaryButton?.link"
              class="w-full sm:w-auto">
              {{ secondaryButton.text }}
            </CustomButton>
          </div>
        </div>

        <!-- Right Image Container -->
        <div class="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <CustomImage :image="image"
            class="max-w-full w-[80%] lg:w-auto h-auto rounded-md object-contain opacity-90 lg:opacity-100" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
