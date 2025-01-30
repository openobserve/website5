<script setup>
import { defineProps } from "vue";
import CustomButton from "../core/CustomButton.vue";
import CustomImage from "../core/CustomImage.vue";

// Define props for the component
defineProps({
  heading: {
    type: Object,
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
    type: String,
    required: true, // URL of the SVG or background image
  },
  image:{
    type: String,
    required: true, // URL of the right-side image
  },
  bottomImage: {
    type: String,
  },
  items:{
    type:Array,
    required:false
  },
});
</script>

<template>
  <section
    class="relative min-h-screen pb-24 lg:pb-32"
    :style="{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
    }"
  >
    <div class="container mx-auto px-6 sm:px-10 lg:px-16 pt-20 lg:pt-0">
      <div
        class="flex flex-col lg:flex-row lg:items-center lg:h-screen lg:justify-between lg:gap-20"
      >
        <!-- Content Container -->
        <div class="relative z-30 w-full lg:w-[40%] mb-8 sm:mb-12 lg:mb-0">
          <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            {{ heading?.title }}
          </h1>
          <p class="text-lg sm:text-xl font-medium text-gray-300 mb-8">
            {{ heading?.subtitle }}
          </p>
          <div class="flex flex-col sm:flex-row justify-start gap-4 w-full">
            <CustomButton
              variant="primary"
              class="w-full sm:w-auto"
              :buttonLink="primaryButton.link"
            >
              {{ primaryButton.title }}
            </CustomButton>
            <CustomButton
              variant="secondary"
              class="w-full sm:w-auto"
              :buttonLink="secondaryButton.link"
            >
              {{ secondaryButton.title }}
            </CustomButton>
          </div>
        </div>

        <!-- Right Image Container -->
        <div
          class="relative w-full lg:w-[50%] flex justify-center items-center z-20 mt-8 sm:mt-12 lg:mt-0"
        >
          <CustomImage
            :src="rightImage"
            alt="Right visual"
            cssClass="w-full max-w-[85%] sm:max-w-[75%] md:max-w-[70%] lg:max-w-full rounded-md object-contain opacity-90 lg:opacity-100"
          />
        </div>
      </div>
    </div>

    <!-- Bottom Image Container -->
    <div
      class="absolute -bottom-[50px] lg:bottom-16 left-0 w-full flex justify-center z-50"
    >
      <CustomImage
        v-if="bottomImage"
        :src="bottomImage"
        alt="Bottom decoration"
        cssClass="w-[85%] sm:w-[75%] md:w-2/3 object-contain"
      />
      <div>
      <!-- render remaining featurecard component here for the solution subpage (items array pass here - icon,title,description)  -->
      <div
        class="flex gap-4"
        v-for="(item, index) in items"
        :key="index"
        :class="layout === 'column' ? 'flex-col justify-start' : 'flex-row'"
      >
        <CustomFeatureCard :card="item" />
      </div>
      </div>

    </div>
  </section>
</template>
