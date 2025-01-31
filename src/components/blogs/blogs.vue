<script setup lang="ts">
import CustomImage from '../core/CustomImage.vue';

defineProps<{
  title: string;
  description: string;
  imageUrl: string;
}>();
</script>

<template>
  <div
    class="max-w-sm rounded-xl overflow-hidden bg-[#2A2A2A] transition-transform hover:scale-105"
  >
    <div class="h-48 overflow-hidden">
      <CustomImage
        :image="imageUrl"
        altText="Blog image"
        cssClass="w-full h-full object-cover"
      />
    </div>
    <div class="p-6">
      <h3 class="text-xl font-bold mb-3 text-white">{{ title }}</h3>
      <p class="text-gray-400 mb-4 text-sm">{{ description }}</p>
      <a
        href="#"
        class="text-[#00A3FF] text-sm font-semibold hover:text-blue-400"
        >LEARN MORE</a
      >
    </div>
  </div>
</template>
