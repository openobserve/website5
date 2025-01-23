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
    class="relative flex justify-center items-center lg:justify-start h-[calc(100vh-100px)] text-center lg:text-left bg-cover bg-center bg-no-repeat px-4 sm:px-8 lg:px-16"
    :style="{ backgroundImage: `url('${background}')` }"
  >
    <!-- Content Section -->
    <div class="relative z-10 text-white max-w-4xl">
      <!-- Title -->
      <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
        {{ title }}
      </h1>
      <!-- Subtitle -->
      <p class="sm:text-xl mb-6">
        {{ subtitle }}
      </p>

      <!-- Buttons -->
      <div class="flex flex-wrap justify-center lg:justify-start gap-4">
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
