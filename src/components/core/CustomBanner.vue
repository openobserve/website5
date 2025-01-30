<script setup>
import CustomButton from "./CustomButton.vue";
import CustomSection from "./CustomSection.vue";

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
    class="relative mx-auto flex items-center justify-center w-full min-h-[80vh] sm:min-h-[80vh] md:min-h-[40vh] bg-cover bg-center"
    style="background-image: url('/Texture.svg'), url('/BG.svg')"
  >
    <CustomSection>
      <div
        class="flex flex-col md:flex-row justify-between items-center w-full py-8 md:py-12 lg:py-16 gap-6 md:gap-8"
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
          class="flex flex-col sm:flex-row items-center sm:items-start md:items-center justify-center gap-2 sm:gap-4 md:gap-6 w-full md:w-auto"
        >
          <CustomButton
            v-for="(button, index) in buttons"
            :key="index"
            :variant="button.variant"
            class="w-full sm:w-auto px-4 py-2 text-sm sm:text-base md:text-lg"
          >
            {{ button.text }}
          </CustomButton>
        </div>
      </div>
    </CustomSection>
  </div>
</template>
