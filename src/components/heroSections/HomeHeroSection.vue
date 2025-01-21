<script setup>
import { defineProps } from "vue";
import CustomButton from "../core/CustomButton.vue";

// Define props for the component
defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  buttons: {
    type: Array,
    default: () => [],
  },
  background: {
    type: String,
    required: true, // URL of the GIF or image
  },
});
</script>

<template>
  <section
    class="relative flex items-center h-screen text-center bg-cover bg-center bg-black ml-4"
    :style="{ backgroundImage: `url(${background})` }"
  >
    <!-- Overlay for better text contrast -->
    <div class="absolute inset-0 bg-black bg-opacity-50"></div>

    <!-- Content Section -->
    <div class="relative z-10 px-4 sm:px-8 text-white">
      <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
        {{ title }}
      </h1>
      <p class="text-lg sm:text-xl md:text-2xl font-medium mb-6">
        {{ subtitle }}
      </p>

      <!-- Buttons -->
      <div class="flex flex-wrap gap-4">
        <CustomButton
          :variant="button.variant"
          v-for="(button, index) in buttons"
          :key="index"
          class="w-full sm:w-auto"
        >
          {{ button.label }}
        </CustomButton>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Optional custom styles if necessary */
</style>
