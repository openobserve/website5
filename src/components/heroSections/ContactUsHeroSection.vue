<script setup>
import Heading from "../core/Heading.vue";
import TextWithGradient from "../HeaderComponents/TextWithGradient.vue";
import { defineProps } from "vue";
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
</script>

<template>
      <!-- backgroundPosition: 'top center, bottom -200px center', -->
    <div
      class="relative flex items-center justify-center min-h-screen px-6 sm:px-12 lg:px-24 bg-no-repeat bg-cover"
      :style="{
      backgroundImage: 'url(/ContactUsTopbg.svg), url(/ContactUsBottombg.svg)',
      backgroundPosition: 'center -200px, bottom center',
      backgroundSize: 'cover, cover',
      backgroundRepeat: 'no-repeat, no-repeat'
      }"
    >
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full container mx-auto">
        <!-- Left Column: Title & Description -->
        <div class="w-full text-left flex flex-col space-y-4">
          <h1 class="text-5xl xl:text-6xl text-white font-bold">{{ title }}</h1>
          <Heading
            :description="description"
            align="LEFT"
            class="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300"
          />
        </div>
  
        <!-- Right Column: Form Placeholder -->
        <div class="w-full flex justify-center">
          <div class="bg-black bg-opacity-40 rounded-2xl p-8 shadow-lg backdrop-blur-md w-full flex items-center justify-center">
              form component
          </div>
        </div>
      </div>
    </div>
  </template>