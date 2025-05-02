<script setup lang="ts">
import CustomButton from "../core/CustomButton.vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  buttons: {
    type: Array as () => Array<{ text: string; link: string; variant: string }>,
    required: false,
    default: () => [],
  },
});
</script>

<template>
  <div class="w-full hero-gradient py-20 px-5">
    <div class="max-w-3xl mx-auto text-center">
      <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
        {{ title }}
      </h2>
      <p class="text-white text-lg md:text-xl mb-8">
        {{ description }}
      </p>
      <div v-if="buttons.length" class="flex flex-col sm:flex-row justify-center gap-4">
        <CustomButton
          v-for="(button, index) in buttons"
          :key="index"
          :variant="button.variant"
          size="medium"
          :buttonText="button.text"
          :buttonLink="button.link"
        />
      </div>
    </div>
  </div>
</template>
