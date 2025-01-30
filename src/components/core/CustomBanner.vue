<script setup>
import CustomButton from "./CustomButton.vue";
import CustomSection from "./CustomSection.vue";

defineProps({
  bannerTitle: {
    type: String,
    required: true,
  },
  bannerDescription: {
    type: String,
    required: true,
  },
  // buttons: {
  //   type: Array,
  //   required: true,
  // },
  primaryButton: {
    type: Object,
    required: true,
  },
  secondaryButton: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<template>
  <div
    class="relative mx-auto flex items-center justify-center w-full min-h-[80vh] sm:min-h-[80vh] md:min-h-[40vh] bg-cover bg-center"
    style="background-image: url('/BG.svg')"
  >
    <!-- Apply the blur effect to the background image -->
    <div
      class="absolute inset-0 bg-cover bg-center"
      style="background-image: url('/Texture.svg'); filter: blur(4px)"
    ></div>

    <CustomSection>
      <div
        class="flex flex-col md:flex-row justify-between items-center w-full py-8 md:py-12 lg:py-16 gap-6 md:gap-8"
      >
        <!-- Text Content -->
        <div class="text-center md:text-left w-full md:w-auto">
          <h1
            class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white drop-shadow-md"
          >
            {{ bannerTitle }}
          </h1>
          <p
            class="text-base sm:text-lg md:text-xl text-white mt-2 sm:mt-3 md:mt-4 font-light drop-shadow-md max-w-2xl"
          >
            {{ bannerDescription }}
          </p>
        </div>

        <!-- Buttons -->
        <div
          class="flex flex-col sm:flex-row items-center sm:items-start md:items-center justify-center gap-2 sm:gap-4 md:gap-6 w-full md:w-auto"
        >
          <!-- <CustomButton
            v-for="(button, index) in buttons"
            :key="index"
            :variant="button.variant"
            class="w-full sm:w-auto px-4 py-2 text-sm sm:text-base md:text-lg"
          >
            {{ button.text }}
          </CustomButton> -->
          <CustomButton 
          variant="primary"
          class="w-full sm:w-auto"
          :buttonLink="primaryButton.link"
          >
          {{ primaryButton.text }}
        </CustomButton>
        <CustomButton 
          variant="secondary"
          class="w-full sm:w-auto"
          :buttonLink="secondaryButton.link"
          >
          {{ secondaryButton.text }}
        </CustomButton>
        </div>
      </div>
    </CustomSection>
  </div>
</template>
