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
  <div class="flex flex-col h-full bg-gradient-to-r rounded-lg hover:bg-[url('/hoverCard.svg')] bg-cover bg-center" style="background-image:linear-gradient(#313539, #1F2226, #313539);">
  <div class="p-6">
    <img
      :src="card.image"
      :alt="card.title"
      class="w-full h-full object-cover rounded-lg grayscale hover:grayscale-0"
    />
  </div>
  <div class="p-6 flex flex-col h-full space-y-4">
    <h3 class="text-[#BEC0C2] text-2xl font-bold mb-3">{{ card?.title }}</h3>
    <p class="text-white text-base flex-1">{{ card?.description }}</p>
    <a
      :href="card.link"
      target="_blank"
      rel="noopener noreferrer"
      class="text-[#80B9FF] font-bold text-base mt-auto"
    >
      {{card?.btnTitle}}
    </a>
  </div>
</div>
</template>