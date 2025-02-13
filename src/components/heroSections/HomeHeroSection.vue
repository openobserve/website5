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
    class="relative flex flex-col items-center lg:justify-start md:h-[calc(100vh-100px)] pb-36 md:pb-0 text-center lg:text-left bg-cover bg-center bg-no-repeat px-4 sm:px-8 lg:px-16"
  >
    <video
      v-if="backgroundVideo"
      class="absolute inset-0 w-full h-full object-cover"
      autoplay
      loop
      muted
      playsinline
    >
      <source :src="backgroundVideo?.url" type="video/mp4" />
      Your browser does not support the video tag.
    </video>

    <!-- Large screen: Position absolute at the top-right -->
    <div class="hidden lg:block absolute right-7 top-8 z-10">
      <DockerCode />
    </div>

    <div
      class="relative flex flex-col lg:flex-row justify-between items-start w-full pt-10 md:pt-10 lg:pt-20 text-white"
    >
      <div
        class="flex flex-col items-center space-y-6 lg:items-start max-w-xl text-center lg:text-left w-full px-2 sm:px-4"
      >
        <h1
          class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold"
          v-html="title"
        ></h1>

        <p class="text-sm sm:text-lg md:text-xl mb-6" v-html="description"></p>

        <div
          class="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 w-full"
        >
          <CustomButton
            variant="primary"
            class="w-full sm:w-auto"
            :buttonLink="primaryButton.link"
            target="_blank"
          >
            {{ primaryButton.text }}
          </CustomButton>
          <CustomButton
            variant="secondary"
            class="w-full sm:w-auto"
            :buttonLink="secondaryButton.link"
            target="_blank"
          >
            {{ secondaryButton.text }}
          </CustomButton>
        </div>

        <!-- Small & medium screens: Show DockerCode below buttons -->
        <div class="lg:hidden w-full flex justify-center">
          <DockerCode />
        </div>
      </div>
    </div>
  </section>
</template>
