<script setup>
import { defineProps } from 'vue';


const props = defineProps({
  card: {
    type: Object,
    required: true,
    default: () => ({
      image: '',
      title: '',
      description: '',
      btnTitle: '',
      link: '#',
    }),
  },
});
</script>

<template>
  <div
    class="flex flex-col h-full bg-gradient-to-r rounded-lg hover:bg-[url('/hoverCard.svg')] bg-cover bg-center p-2 lg:p-4 space-y-2 md:space-y-4"
    style="background-image: linear-gradient(#313539, #1F2226, #313539);"
  >
    <div class="">
      <img
        :src="card.image"
        :alt="card.title"
        class="w-full h-auto max-h-60 md:max-h-80 lg:max-h-96 object-cover rounded-lg grayscale hover:grayscale-0"
      />
    </div>
    <div class=" flex flex-col h-full space-y-4">
      <h3 class="text-[#BEC0C2] text-lg lg:text-2xl font-bold mb-2 md:mb-3">
        {{ card?.title }}
      </h3>
      <p class="text-white text-sm lg:text-base flex-1">
        {{ card?.description }}
      </p>
      <a
        :href="card.link"
        target="_blank"
        rel="noopener noreferrer"
        class="text-[#80B9FF] font-bold text-sm md:text-base lg:text-lg mt-auto"
      >
        {{ card?.btnTitle }}
      </a>
    </div>
  </div>
</template>