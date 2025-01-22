<script setup>
import { defineProps } from "vue";
import CustomFeatureCard from "../cards/CustomFeatureCard.vue";
import CustomSection from "../core/CustomSection.vue";
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
  <section
    class="relative flex flex-col items-center text-center bg-cover bg-center bg-no-repeat py-16 px-4 sm:px-8 lg:px-16"
    :style="{ backgroundImage: `url(${backgroundImage})` }"
  >
    <!-- Content Section -->
    <div class="relative z-10 text-white max-w-4xl mx-auto">
      <!-- Title -->
      <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
        {{ title }}
      </h1>
      <!-- Subtitle -->
      <p class="text-lg sm:text-xl font-medium mb-8">
        {{ subtitle }}
      </p>
      <!-- Buttons -->
      <div class="flex justify-center gap-4 mb-12">
        <button class="gtbtn">Get Started for Free</button>
        <button class="dmbtn">Request Enterprise Demo</button>
      </div>
    </div>

    <!-- Cards Section -->
    <CustomSection>
      <CustomFeatureCard :cards="cards" />
    </CustomSection>

    <!-- Footer Image -->
    <div class="relative z-10 max-w-4xl w-full">
      <img
        :src="footerImage"
        alt="Footer visual"
        class="w-full object-contain rounded-lg"
      />
    </div>
  </section>
</template>

<style scoped>
.gtbtn {
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
