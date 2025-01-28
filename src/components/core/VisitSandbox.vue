<script setup>

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
background: linear-gradient(to right,#FFFFFF, #F6DDDD, #FDC8C8);
-webkit-background-clip: text;
background-clip: text;
-webkit-text-fill-color: transparent;
}
</style>

<template>
    <div class="relative flex items-center justify-center overflow-hidden max-w-screen ">
      <!-- Background Image -->
      <div 
        class="absolute inset-0 bg-cover bg-center bg-no-repeat"
        :style="{
      backgroundImage: `url(${backgroundImage})`,
    }"
      >
      </div>
      <div class="relative z-10 text-center px-4 container mx-auto mb-10 mt-10">
        <h1 class="text-white text-5xl font-bold gradient-text"
        style="font-size: 3rem;"
         >
            {{ title }}
        </h1>
        <p class="text-white text-lg mb-4">
          {{ description  }}
        </p>
        <CustomButton
          v-for="(button, index) in buttons"
          :key="index"
          :variant="button.variant"
          class="w-full"
        >
          {{ button.label }}
        </CustomButton>
      </div>
    </div>
  </template>
  
