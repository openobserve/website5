<script setup lang="ts">
import CustomButton from "../core/CustomButton.vue";

interface ButtonProps {
  link: string;
  text: string;
  target?: string;
}

const props = defineProps<{
  heading? :{
    title:string;
    description:string;
  }
  primaryButton: ButtonProps;
  secondaryButton?: ButtonProps;
}>();
</script>


<template>
  <div class="w-full hero-gradient py-20 px-5">
    <div class="max-w-2xl lg:max-w-3xl mx-auto px-4 text-center">
      <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
        {{ heading?.title }}
      </h2>
      <p class="text-white text-lg md:text-xl mb-8">
        {{ heading?.description }}
      </p>

      <div v-if="primaryButton || secondaryButton" class="flex flex-col sm:flex-row justify-center gap-4">
        <CustomButton v-if="primaryButton" variant="secondary" size="medium" :buttonText="primaryButton.text"
          :buttonLink="primaryButton.link" :target="primaryButton.target" />
        <CustomButton v-if="secondaryButton" variant="tertiary" size="medium" :buttonText="secondaryButton.text"
          :buttonLink="secondaryButton.link" :target="secondaryButton.target" />
      </div>
    </div>
  </div>
</template>
