<script setup>
import { defineProps, computed } from "vue";
import CustomButton from "../core/CustomButton.vue";

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
    class="relative flex flex-col items-center justify-end text-center px-4 w-full min-h-[40vh] before:content-[''] before:absolute before:w-full before:min-h-[160vh] before:top-0 before:bg-no-repeat before:bg-[50%_-50vh] xl:before:bg-[50%_-30vh]"
    :style="sectionStyles"
  >
    <div class="container mx-auto px-6 sm:px-10 lg:px-16 pt-20 lg:pt-0">
      <div
        class="flex flex-col lg:flex-row lg:items-center lg:h-screen lg:justify-between lg:gap-20"
      >
        <!-- Content Container -->
        <div class="relative z-30 w-full lg:w-[40%] mb-8 sm:mb-12 lg:mb-0">
          <h1
            class="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
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
          class="relative w-full lg:w-[50%] flex justify-center items-center z-20 mt-8 sm:mt-12 lg:mt-0"
        >
          <img
            :src="rightImage"
            alt="Right visual"
            class="w-full max-w-[85%] sm:max-w-[75%] md:max-w-[70%] lg:max-w-full rounded-md object-contain opacity-90 lg:opacity-100"
          />
        </div>
      </div>
    </div>

    <!-- Bottom Image Container -->
    <div
      class="absolute -bottom-[50px] lg:bottom-16 left-0 w-full flex justify-center z-50"
    >
      <img
        v-if="bottomImage"
        :src="bottomImage"
        alt="Bottom decoration"
        class="w-[85%] sm:w-[75%] md:w-2/3 object-contain"
      />
    </div>
  </section>
</template>
<style scoped>
section::before {
  background-image: var(--before-bg);
}
</style>
