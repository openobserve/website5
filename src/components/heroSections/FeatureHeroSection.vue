<script setup>
import { defineProps } from "vue";
import CustomFeatureSliderCard from "../cards/CustomFeatureSliderCard.vue";
import CustomFeatureCard from "../cards/CustomFeatureCard.vue";
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
  <section
    class="relative flex flex-col items-center text-center bg-no-repeat bg-[50%_40vh] md:bg-[50%_20vh] bg-cover px-4 py-24"
    :style="{
      backgroundImage: `url(${backgroundImage})`,
    }"
  >
    <!-- Title and Subtitle Section -->
    <div class="text-white max-w-4xl mx-auto mb-8">
      <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
        {{ title }}
      </h1>
      <p class="text-lg sm:text-xl md:text-2xl font-medium">{{ subtitle }}</p>
    </div>

    <!-- Hero Section with Background -->
    <div class="w-full max-w-7xl px-4">
      <!-- Buttons Section -->
      <div class="flex flex-col sm:flex-row justify-center gap-4 mb-3 w-full">
        <CustomButton
          v-for="(button, index) in buttons"
          :key="index"
          :variant="button.variant"
          class="w-full sm:w-auto"
        >
          {{ button.label }}
        </CustomButton>
      </div>

      <!-- Cards Section -->
      <div class="w-full py-10">
        <!-- Show CustomFeatureSliderCard on mobile and tablet screens -->
        <div class="block md:hidden text-start">
          <CustomFeatureSliderCard
            :cards="cards"
            titleTextColor="text-gray-800"
            descriptionTextColor="text-gray-600"
          />
        </div>

        <!-- Show CustomFeatureCard on desktop screens -->
        <div class="hidden md:block text-start">
          <CustomFeatureCard
            :cards="cards"
            titleTextColor="text-gray-800"
            descriptionTextColor="text-gray-600"
          />
        </div>
      </div>

      <!-- Footer Image -->
      <div class="w-full mt-12">
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
