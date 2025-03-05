<script setup>
import CustomButton from './CustomButton.vue';
defineProps({
  ctaTitle: {
    type: String,
    required: true,
  },
  ctaDescription: {
    type: String,
    required: true,
  },
  ctaButton: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div 
    class="flex items-center justify-center overflow-hidden max-w-screen bg-[url('/img/bg/gradient-bg/sandboxBG.jpg')] bg-cover bg-center bg-no-repeat px-4 py-10"
  >
    <div class="text-center text-wrap container mx-auto">
      <h1 class="text-white text-3xl md:text-5xl font-bold">
        {{ ctaTitle }}
      </h1>
      <p class="text-white text-lg mt-5">
        {{ ctaDescription }}
      </p>
      <div class="flex flex-wrap justify-center mt-7">
        <CustomButton variant="secondary" class="w-full sm:w-auto cursor-pointer" :buttonLink="ctaButton.link" target="_blank">
          {{ ctaButton.text }}
        </CustomButton>
      </div>
    </div>
  </div>
</template>
