<script setup>
import { defineProps } from "vue";

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
    type: Array, // Array of button objects [{ label: "Button Title", variant: "primary" }]
    required: true,
  },
  backgroundImage: {
    type: String,
    required: true, // URL of the SVG or background image
  },
  rightImage: {
    type: String,
    required: true, // URL of the right-side image
  },
});
</script>

<template>
  <section
    class="relative flex flex-col lg:flex-row items-center lg: justify-between h-screen px-6 sm:px-10 lg:px-16 py-16"
  >
    <!-- Left Content -->
    <div class="lg:text-left items-center max-w-2xl z-10">
      <!-- Title -->
      <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
        {{ title }}
      </h1>
      <!-- Subtitle -->
      <p class="text-lg sm:text-xl font-medium text-gray-300 mb-8">
        {{ subtitle }}
      </p>
      <!-- Buttons -->
      <div class="flex flex-wrap justify-center lg:justify-start gap-4">
        <button
          v-for="(button, index) in buttons"
          :key="index"
          :class="[
            'px-6 py-3 rounded-full text-sm font-semibold transition-all',
            button.variant === 'primary'
              ? 'bg-black text-white hover:bg-gray-800'
              : 'border border-white text-white hover:bg-white hover:text-black',
          ]"
        >
          {{ button.label }}
        </button>
      </div>
    </div>

    <!-- Right Image -->
    <div
      class="relative w-full lg:w-1/2 mt-10 lg:mt-0 flex justify-center items-center"
    >
      <img
        :src="rightImage"
        alt="Right visual"
        class="w-full rounded-md md:w-3/4 lg:w-full lg:translate-x-16 object-contain opacity-60 lg:opacity-100"
      />
    </div>
  </section>
</template>

<style scoped></style>
