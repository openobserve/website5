<script setup>
import CustomSection from './CustomSection.vue';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  direction:{
    type: String,
    validator(value) {
      return ["left", "right"].includes(value);
    } 
  },
});

</script>

<template>
  <CustomSection>
    <div
      :class="[
        'w-full flex lg:flex-row flex-col-reverse lg:flex-col-2 space-y-4 md:space-y-0 space-x-0 md:space-x-4 gap-6',
        direction === 'left' ? 'lg:flex-row-reverse':'lg:flex-row'
      ]"
    >
      <div
        class="font-inter font-medium text-base sm:text-md md:text-lg lg:text-xl text-white mb-2"
      >
        {{ description }}
      </div>
      <div 
        :class="[
          ' flex  items-center  w-full',
          direction === 'left' ? 'flex-col-reverse' : 'flex-col',
        ]"
      >
        <img 
          :src="image" 
          :alt="image" 
          class="w-20 h-20 rounded-md shadow-md" 
        />
        <h2 
          class="text-white font-inter font-bold text-xl md:text-2xl lg:text-4xl"
        >
          {{ title }}
        </h2>
      </div>
    </div>
  </CustomSection>
  </template>