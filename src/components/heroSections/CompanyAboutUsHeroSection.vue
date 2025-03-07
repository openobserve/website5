<script setup>
import Heading from "../core/Heading.vue";
import CustomButton from "../core/CustomButton.vue";

// Define Props
const props = defineProps({
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
    required: false,
  },
});

// Function to split text into sentences and wrap each in a span
const formatSubtitle = (text) => {
  return text
    .split(".")
    .filter((sentence) => sentence.trim())
    .map((sentence) => sentence.trim() + "."); // Keep periods intact
};
</script>

<template>
  <div class="relative flex flex-col justify-center items-center py-16 px-4 sm:px-8 lg:px-16 bg-no-repeat bg-cover"
    :style="{
      backgroundImage: 'url(/img/bg/gradient-bg/aboutusHerosectionbg.svg)',
      backgroundSize: 'contain',
      backgroundPosition: 'center',
    }">
    <div class="container mx-auto flex flex-col justify-center items-center text-center gap-8">
      <div>
        <h1 class="text-5xl lg:text-7xl text-white font-bold text-center">
          {{ title }}
        </h1>
      </div>

      <!-- Render Subtitle Safely -->
      <div>
        <Heading :description="description" align="CENTER">
          <span v-for="(sentence, index) in formatSubtitle(description)" :key="index" class="sentence">
            {{ sentence }}
          </span>
        </Heading>
      </div>

      <!-- Primary Button (Optional) -->
      <div v-if="primaryButton" class="py-10">
        <CustomButton variant="primary" class="w-full sm:w-auto" :buttonLink="primaryButton?.link">
          {{ primaryButton?.text }}
        </CustomButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Responsive Gradient Color Text */
@media (max-width: 640px) {
  .gradient-color {
    font-size: 2rem;
    line-height: 1.2;
  }
}
</style>
