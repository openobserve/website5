<script setup>
import { defineProps } from "vue";
import CustomFeatureCard from "../cards/CustomFeatureCard.vue";
import CustomSection from "../core/CustomSection.vue";
import CustomFeatureSliderCard from "../cards/CustomFeatureSliderCard.vue";
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
    <!-- Content Section -->
    <div class="relative z-10 text-white max-w-4xl mx-auto">
      <!-- Title -->
      <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
        {{ title }}
      </h1>
      <!-- Subtitle -->
      <p>
        {{ subtitle }}
      </p>
    </div>

    <div
      class="flex flex-col items-center text-center bg-cover bg-center bg-no-repeat py-16 px-4 sm:px-8 lg:px-16"
      :style="{ backgroundImage: `url(${backgroundImage})` }"
    >
      <!-- Buttons Section: full-width on mobile and centered -->
      <div class="flex flex-col sm:flex-row justify-center gap-4 mb-12 w-full">
        <button class="gtbtn w-full sm:w-auto">Get Started for Free</button>
        <button class="dmbtn w-full sm:w-auto">Request Enterprise Demo</button>
      </div>

      <!-- Cards Section -->
      <div class="text-start w-full">
        <CustomFeatureSliderCard
          :cards="cards"
          titleTextColor="text-[#14181B]"
          descriptionTextColor="text-[#23282C]"
        />
      </div>

      <!-- Footer Image -->
      <div class="relative z-10 max-w-4xl w-full">
        <img
          :src="footerImage"
          alt="Footer visual"
          class="w-full object-contain rounded-lg"
        />
      </div>
    </div>
    <!-- Buttons -->
  </section>
</template>

<style scoped>
.gtbtn {
  color: #fff;
  display: flex;
  height: 48px;
  padding: 0px 24px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 24px;
  background: var(--Dark-Black, #010101);
}

.dmbtn {
  display: flex;
  height: 48px;
  padding: 0px 24px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 24px;
  border: 1px solid var(--Dark-900, #14181b);
}
</style>
