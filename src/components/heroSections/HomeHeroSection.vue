<script setup>
import { defineProps } from "vue";
import CustomButton from "../core/CustomButton.vue";
import TextWithGradient from "../HeaderComponents/TextWithGradient.vue";

// Define props for the component
defineProps({
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
      <TextWithGradient class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center sm:text-left"
        :title="title" textGradientColor="gradient-color" align="left" />

      <!-- Subtitle -->
      <p class="sm:text-xl mb-6">
        {{ description }}
      </p>

      <!-- Buttons -->
      <div class="flex flex-wrap justify-center lg:justify-start gap-4">
        <CustomButton variant="primary" class="w-full sm:w-auto" :buttonLink="primaryButton.link">
          {{ primaryButton.title }}
        </CustomButton>
        <CustomButton variant="secondary" class="w-full sm:w-auto" :buttonLink="secondaryButton.link">
          {{ secondaryButton.title }}
        </CustomButton>
      </div>
    </div>
  </section>
</template>

<style scoped>
.gradient-color {
  display: inline-block;
  background: linear-gradient(to right,
      rgba(246, 221, 221, 0.8),
      rgba(255, 255, 255, 0.8),
      rgba(227, 220, 255, 0.8));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
