<script setup>
import CustomButton from './CustomButton.vue';
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  backgroundImage: {
    type: String,
    required: true, // URL of the background image
  },
  buttons: {
    type: Array, // Array of button objects [{ label: "Button Title", variant: "primary" }]
    required: true,
  },
});
</script>

<style scoped>
.gradient-text {
  background: linear-gradient(to right, #FFFFFF, #f1cbcb,#FFFFFF, #F6DDDD);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>

<template>
  <div 
    class="flex items-center justify-center overflow-hidden max-w-screen bg-cover bg-center bg-no-repeat px-4 py-10 "
    :style="{ backgroundImage: `url(${backgroundImage})` }"
  >
    <div class="text-center text-wrap container mx-auto">
      <h1 class="text-white text-5xl font-bold gradient-text" style="font-size: 3rem;">
        {{ title }}
      </h1>
      <p class="text-white text-lg mt-5">
        {{ description }}
      </p>
      <div class="flex flex-wrap justify-center mt-7">
        <CustomButton
          v-for="(button, index) in buttons"
          :key="index"
          :variant="button.variant"
          class="px-3 py-1 cursor-pointer"
        >
          {{ button.label }}
        </CustomButton>
      </div>
    </div>
  </div>
</template>
