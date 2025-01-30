<script setup>
import { defineProps, computed } from "vue";
import CustomButton from "../core/CustomButton.vue";
import CustomImage from "../core/CustomImage.vue";

// Define props for the component
const props = defineProps({
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
  backgroundImage: {
    type: String,
    required: true,
  },
  rightImage: {
    type: String,
    required: true,
  },
  bottomImage: {
    type: String,
  },
});
// Compute background style dynamically
const sectionStyles = computed(() => ({
  "--before-bg": `url('${props.backgroundImage}')`,
}));
</script>

<template>
  <section
    class="relative flex flex-col items-center justify-end px-4 w-full min-h-[40vh] before:content-[''] before:absolute before:w-full before:min-h-[160vh] before:top-0 before:bg-no-repeat before:bg-contain before:bg-[50%_40vh] xl:before:bg-[50%_40vh]"
    :style="sectionStyles"
  >
    <div class="container mx-auto px-6 sm:px-10 lg:px-16 pt-20 lg:pt-0">
      <div
        class="flex flex-col lg:flex-row lg:items-center lg:h-screen lg:justify-between lg:gap-20"
      >
        <!-- Content Container -->
        <div class="relative z-30 w-full lg:w-[50%] mb-8 sm:mb-12 lg:mb-0">
          <h1
            class="text-3xl sm:text-4xl md:text-5xl xl:text-7xl font-bold text-white mb-4"
          >
            {{ title }}
          </h1>
          <p class="text-lg sm:text-xl font-medium text-gray-300 mb-8">
            {{ subtitle }}
          </p>
          <div class="flex flex-col sm:flex-row justify-start gap-4 w-full">
            <CustomButton
              v-for="(button, index) in buttons"
              :key="index"
              :variant="button.variant"
            >
              {{ button.label }}
            </CustomButton>
          </div>
        </div>

        <!-- Right Image Container -->
        <div
          class="relative py-4 lg:absolute lg:right-0 lg:top-1/2 lg:transform lg:-translate-y-1/2 w-full lg:w-[50%] flex justify-center lg:justify-end items-center z-20 mt-8 sm:mt-12 lg:mt-0"
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
    <div class="absolute -bottom-[50px] lg:bottom-16 left-0 w-full flex justify-center z-50">
      <CustomImage
        v-if="bottomImage"
        :src="bottomImage"
        alt="Bottom decoration"
        cssClass="w-[85%] sm:w-[75%] md:w-2/3 object-contain"
      />
    </div>
  </section>
</template>
<style scoped>
section::before {
  background-image: var(--before-bg);
}
</style>
