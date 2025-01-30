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
    class="relative flex justify-center lg:justify-start min-h-screen lg:text-left px-4 sm:px-8 lg:px-16"
  >
    <video
      class="absolute top-0 left-0 w-full h-full object-cover"
      autoplay
      muted
      loop
      playsinline
    >
      <source
        src="/Homepage/Screenity-video-Jan 31-2025.mp4"
        type="video/mp4"
      />
      Your browser does not support the video tag.
    </video>
    <!-- Content Section -->
    <div class="relative pt-10 md:pt10 md:pl-10 lg:pt-20 lg:pl-20 text-white max-w-4xl">
      <!-- Title -->
      <TextWithGradient
        class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:text-left"
        :title="title"
        textGradientColor="gradient-color"
        align="left"
      />

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
