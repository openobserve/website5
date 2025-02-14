<script setup>
import { defineProps } from "vue";
import CustomButton from "../core/CustomButton.vue";
import DockerCode from "../core/DockerCode.vue";

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
    required: true,
  },
  secondaryButton: {
    type: Object,
    default: () => ({}),
  },
  backgroundVideo: {
    type: String,
    required: false,
  },
});
</script>

<template>
  <section
    class="relative flex items-start justify-center min-h-screen px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden text-white text-center lg:text-left"
  >
    <!-- Background Video -->
    <div>
      <video
        v-if="backgroundVideo"
        class="absolute inset-x-0 top-20 w-full h-full object-cover"
        autoplay
        loop
        muted
        playsinline
      >
        <source :src="backgroundVideo?.url" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div class="absolute inset-0 bg-black bg-opacity-50"></div>
    </div>

    <!-- Main Content -->
    <div
      class="relative z-10 flex flex-col lg:flex-row items-start justify-between w-full mx-auto pt-16 md:pt-[10vh] px-4 sm:px-6 lg:px-8 space-y-10 lg:space-y-0"
    >
      <!-- Left Content -->
      <div
        class="w-full lg:w-1/2 flex flex-col space-y-6 text-center lg:text-left "
      >
        <h1
          class="text-2xl sm:text-3xl md:text-4xl xl:text-6xl  font-bold leading-tight sm:leading-[2rem] md:leading-[2.5rem] lg:leading-[2.8rem] xl:leading-[3.5rem]"
          v-html="title"
        ></h1>

        <p
          class="text-base sm:text-lg md:text-xl opacity-80"
          v-html="description"
        ></p>

        <!-- Buttons -->
        <div
          class="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center lg:justify-start"
        >
          <CustomButton
            variant="primary"
            class="w-full sm:w-auto px-6 py-3 md:text-lg"
            :buttonLink="primaryButton.link"
            target="_blank"
          >
            {{ primaryButton.text }}
          </CustomButton>
          <CustomButton
            v-if="secondaryButton.text"
            variant="secondary"
            class="w-full sm:w-auto px-6 py-3 md:text-lg"
            :buttonLink="secondaryButton.link"
            target="_blank"
          >
            {{ secondaryButton.text }}
          </CustomButton>
        </div>
      </div>

      <!-- Right Content (DockerCode) -->
      <div class="w-full lg:w-1/2 flex justify-center lg:justify-end sm:px-0">
        <DockerCode class="w-full max-w-xs sm:max-w-md md:max-w-lg" />
      </div>
    </div>
  </section>
</template>
