<script setup lang="ts">
import CustomButton from "../core/CustomButton.vue";

interface ButtonProps {
  link: string;
  name: string;
  target?: string;
}

const props = defineProps<{
  title: string;
  description: string;
  primarybtn: ButtonProps;
  secondarybtn?: ButtonProps;
}>();
</script>


<template>
  <div class="w-full hero-gradient py-20 px-5">
    <div class="max-w-2xl lg:max-w-3xl mx-auto px-4 text-center">
      <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
        {{ title }}
      </h2>
      <p class="text-white text-lg md:text-xl mb-8">
        {{ description }}
      </p>

      <div v-if="primarybtn || secondarybtn" class="flex flex-col sm:flex-row justify-center gap-4">
        <CustomButton v-if="primarybtn" variant="secondary" size="medium" :buttonText="primarybtn.name"
          :buttonLink="primarybtn.link" :target="primarybtn.target" />
        <CustomButton v-if="secondarybtn" variant="tertiary" size="medium" :buttonText="secondarybtn.name"
          :buttonLink="secondarybtn.link" :target="secondarybtn.target" />
      </div>
    </div>
  </div>
</template>
