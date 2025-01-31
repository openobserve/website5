<script setup>
import { defineProps } from "vue";
import CustomButton from "../core/CustomButton.vue";

// Define props for the component
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
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
  backgroundVideo: {
    type: String,
    required: false // URL rue,of the GIF or image
  },
});
</script>

<template>
  <section
    class="relative flex justify-center items-center lg:justify-start h-[calc(100vh-100px)] text-center lg:text-left bg-cover bg-center bg-no-repeat px-4 sm:px-8 lg:px-16"
    :style="{ backgroundImage: 'url(/Metrices.svg)' }">
    <!-- <video width="640" height="360" controls>
      <source src="video.mp4" type="video/mp4">
      <source src="video.ogg" type="video/ogg">
      Your browser does not support the video tag.
    </video> -->
    <!-- Content Section -->
    <div class="relative z-10 text-white max-w-4xl">
      <!-- Title -->
        <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center sm:text-left">{{ title }}</h1>
        <!-- Subtitle -->
        <p class="sm:text-xl mb-6">
          {{ description }}
        </p>

      <!-- Buttons -->
      <div class="flex flex-wrap justify-center lg:justify-start gap-4">
        <CustomButton variant="primary" class="w-full sm:w-auto" :buttonLink="primaryButton.link">
          {{ primaryButton.text}}
        </CustomButton>
        <CustomButton variant="secondary" class="w-full sm:w-auto" :buttonLink="secondaryButton.link">
          {{ secondaryButton.text }}
        </CustomButton>
      </div>
    </div>
  </section>
</template>
