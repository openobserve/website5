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
    required: true,
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
  "--before-bg": `url('/Platform/PlatformSubHeroBg.svg')`,
}));
</script>

<template>
  <section
    class="relative flex flex-col items-center justify-end px-4 max-w-full min-h-[10vh] before:z-0 before:content-[''] before:absolute before:w-full before:min-h-[160vh] before:top-0 before:bg-no-repeat before:bg-contain before:bg-[50%_40vh] xl:before:bg-[50%_40vh]"
    :style="sectionStyles"
  >
    <div class="container mx-auto px-6 sm:px-10 lg:px-16 pt-20 lg:pt-0">
      <div
        class="flex flex-col lg:flex-row lg:items-center lg:min-h-[calc(100vh-5rem)] lg:justify-between lg:gap-20 pr-[2vh]"
      >
        <!-- Content Container -->
        <div
          class="relative z-30 w-full lg:w-[50%] mb-8 sm:mb-12 lg:mb-0 pr-[2vh]"
        >
          <h1
            class="text-3xl sm:text-4xl md:text-5xl xl:text-7xl font-bold text-white mb-4"
          >
            {{ heading?.title }}
          </h1>
          <p class="text-lg sm:text-xl font-medium text-gray-300 mb-8">
            {{ heading?.subtitle }}
          </p>
          <div class="flex flex-col flex-wrap sm:flex-row justify-start gap-4">
            <CustomButton
              variant="primary"
              class="w-full sm:w-auto"
              :buttonLink="primaryButton.link"
              target="_blank"
            >
              {{ primaryButton.text }}
            </CustomButton>
            <CustomButton
              variant="secondary"
              class="sm:w-auto"
              :buttonLink="secondaryButton.link"
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

    <!-- Bottom Image Container -->
    <!-- <div
      class="absolute -bottom-[50px] lg:bottom-16 left-0 w-full flex justify-center z-50"
    >
      <CustomImage
        v-if="bottomImage"
        :image="bottomImage"
        altText="Bottom decoration"
        cssClass="w-[85%] sm:w-[75%] md:w-2/3 object-contain"
      /> -->

    <!-- render remaining featurecard component here for the solution subpage (items array pass here - icon,title,description)  -->
    <!-- <div
            :class="[
              `grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3  gap-10 w-full`,
            ]"
          >
        <div
          class="flex gap-4"
          v-for="(item, index) in items"
          :key="index"
          :class="layout === 'column' ? 'flex-col justify-start' : 'flex-row'"
        >
          <CustomFeatureCard :card="item" />
          {{console.log(items,"itemssssssssssssssssssssssssssssssss")}}
        </div>
        </div> -->
    <!-- </div> -->
  </section>
</template>
<style scoped>
section::before {
  background-image: var(--before-bg);
}
</style>
