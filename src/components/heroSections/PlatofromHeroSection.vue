<script setup>
import { defineProps } from "vue";
import CustomFeatureSliderCard from "../cards/CustomFeatureSliderCard.vue";
import CustomButton from "../core/CustomButton.vue";
// Define props for dynamic data
defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  cards: {
    type: Array,
    required: true,
  },
  buttons: {
    type: Array, // Array of button objects [{ label: "Button Title", variant: "primary" }]
    required: true,
  },
  backgroundImage: {
    type: String,
    required: true, // URL of the background image
  },
  footerImage: {
    type: String,
    required: true, // URL of the footer image
  },
});
</script>

<template>
  <section class="text-center">
    <!-- Title and Subtitle Section -->
    <div class="relative z-10 text-white max-w-4xl mx-auto">
      <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
        {{ title }}
      </h1>
      <p class="text-lg sm:text-xl md:text-2xl font-medium">{{ subtitle }}</p>
    </div>

    <!-- Hero Section with Background -->
    <div
      class="relative flex flex-col items-center text-center bg-no-repeat bg-center bg-cover py-16 px-4 sm:px-8 lg:px-16"
      :style="{ backgroundImage: `url(${backgroundImage})` }"
    >
      <!-- Buttons Section -->
      <div class="flex flex-col sm:flex-row justify-center gap-4 mb-12 w-full">
        <CustomButton
          v-for="(button, index) in buttons"
          :key="index"
          :variant="button.variant"
        >
          {{ button.label }}
        </CustomButton>
      </div>

      <!-- Cards Section -->
      <div class="text-start w-full">
        <CustomFeatureSliderCard
          :cards="cards"
          titleTextColor="text-gray-800"
          descriptionTextColor="text-gray-600"
        />
      </div>

      <!-- Footer Image -->
      <div class="relative z-10 max-w-4xl w-full mt-12">
        <img
          :src="footerImage"
          alt="Footer visual"
          class="w-full object-contain rounded-lg"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Tailwind CSS does most of the styling; additional adjustments can be made here if needed */
</style>
