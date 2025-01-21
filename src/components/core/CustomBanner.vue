<script setup>
import CustomButton from "./CustomButton.vue";

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
    required: true,
  },
});
</script>

<template>
  <div
    class="relative flex items-center justify-center w-full min-h-[180px] sm:min-h-[200px] md:min-h-[250px] bg-cover bg-center px-4 sm:px-6 md:px-8"
    style="background-image: url('/public/Texture.svg'), url('/public/BG.svg')"
  >
    <div
      class="flex flex-col md:flex-row justify-between items-center w-full max-w-[1200px] py-8 md:py-12 lg:py-16 gap-6 md:gap-8"
    >
      <!-- Text Content -->
      <div class="text-center md:text-left w-full md:w-auto">
        <h1 
          class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white drop-shadow-md"
        >
          {{ title }}
        </h1>
        <p 
          class="text-base sm:text-lg md:text-xl text-white mt-2 sm:mt-3 md:mt-4 font-light drop-shadow-md max-w-2xl"
        >
          {{ subtitle }}
        </p>
      </div>

      <!-- Buttons -->
      <div 
        class="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full md:w-auto"
      >
        <CustomButton
          v-for="(button, index) in buttons"
          :key="index"
          :variant="button.variant"
          class="w-full sm:w-auto"
        >
          {{ button.text }}
        </CustomButton>
      </div>
    </div>
  </div>
</template>