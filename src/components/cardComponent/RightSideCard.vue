<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  cards: {
    type: Array,
    required: true,
    default: () => [],
  },
});
</script>

<template>
  <div class="flex flex-col gap-3 justify-center items-center h-full">
  <div v-for="(item, index) in cards" :key="index" class="rounded-2xl h-full">
    <div
  class="flex bg-gradient-to-r rounded-lg h-full"
  style="background-image: linear-gradient(90deg, #313539 0%, #1F2226 50%, #313539 100%);"
>
      <div class="w-1/2 p-6">
        <img
          :src="item.image"
          :alt="item.title"
          class="w-full h-full object-cover rounded-lg grayscale hover:grayscale-0"
        />
      </div>
      <div class="p-6 flex flex-col h-full space-y-4">
        <h3 class="text-[#BEC0C2] text-2xl font-bold mb-3">{{ item?.title }}</h3>
        <p class="text-white text-base flex-1">{{ item?.description }}</p>
        <a
          :href="item.link"
          target="_blank"
          rel="noopener noreferrer"
          class="text-[#80B9FF] font-bold text-base mt-auto"
        >
          {{ item.btnTitle }}
        </a>
      </div>
    </div>
  </div>
</div>

</template>


