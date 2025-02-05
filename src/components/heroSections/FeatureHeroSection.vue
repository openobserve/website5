<script setup>
import { defineProps } from "vue";
import CustomFeatureSliderCard from "../cards/CustomFeatureSliderCard.vue";
import CustomButton from "../core/CustomButton.vue";
import CustomImage from "../core/CustomImage.vue";
import CustomFeatureCardLandingPage from "../cards/CustomFeatureCardLandingPage.vue";
// Define props for dynamic data
defineProps({
  heading:{
    type:Object,
    required:true,
  },
  items: {
    type: Array,
    required: true,
  },
  noOfGridColumn: {
    type: Number,
    default:3,
    required: true,
  },
  primaryButton: {
    type: Object,
    required: true,
  },
  secondaryButton: {
    type: Object,
    default: () => ({}),
  },
  backgroundImage: {
    type: Object,
    required: true, // URL of the background image
  },
  image: {
    type: String,
    required: true, // URL of the footer image
  },
});


</script>

<template>
  <section
    class="relative  min-h-[100vh] flex flex-col items-center text-center bg-no-repeat bg-[50%_40vh] md:bg-[50%] bg-cover px-4 pt-20"
    :style="{
      backgroundImage: `url('/Platform/platformHeroBg.svg')`,
    }"
  >
    <!-- Title and Subtitle Section -->
    <div class="text-white max-w-4xl mx-auto mb-8">
      <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
        {{ heading?.title }}
      </h1>
      <p class="text-lg sm:text-xl md:text-2xl font-medium text-[#E2E3E5]">{{ heading?.subtitle }}</p>
    </div>

    <!-- Hero Section with Background -->
    <div class="w-full max-w-7xl px-4">
      <!-- Buttons Section -->
      <div class="flex flex-col sm:flex-row justify-center gap-4 mb-3 w-full">
        <CustomButton variant="primary" class="w-full sm:w-auto" :buttonLink="primaryButton.link">
          {{ primaryButton.text }}
        </CustomButton>
        <CustomButton variant="secondary" class="w-full sm:w-auto" :buttonLink="secondaryButton.link">
          {{ secondaryButton.text }}
        </CustomButton>
      </div>

      <!-- Cards Section -->
      <div class="w-full py-10">
        <!-- Show CustomFeatureSliderCard on mobile and tablet screens -->
        <div class="block md:hidden text-start">
          <CustomFeatureSliderCard
            :cards="items"
            titleTextColor="text-gray-800"
            descriptionTextColor="text-gray-600"
          />
        </div>

        <!-- Show CustomFeatureCard on desktop screens -->
        <div class="hidden md:block text-start">
          <div
            :class="[
              `grid grid-cols-2 md:grid-cols-2 lg:grid-cols-${noOfGridColumn}  gap-10 w-full`,
            ]"
          >
            <div
              class="flex gap-4"
              v-for="(item, index) in items"
              :key="index"
              :class="
                layout === 'column' ? 'flex-col justify-start' : 'flex-row'
              "
            >
            <CustomFeatureCardLandingPage
                :card="item"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Image -->
      <div class="w-full">
        <CustomImage
          :image="image"
          altText="Footer visual"
          cssClass="w-full object-contain rounded-lg"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Tailwind CSS does most of the styling; additional adjustments can be made here if needed */
</style>