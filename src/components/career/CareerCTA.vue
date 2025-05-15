<template>
  <div class="bg-gray-950 text-white py-16 px-4 text-center">
    <h2 class="text-2xl md:text-3xl font-bold mb-4">{{ title }}</h2>
    <p class="text-lg mb-8 max-w-2xl mx-auto">{{ description }}</p>
    <a :href="primaryButton.link" :target="primaryButton.target" class="bg-blue-500 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-600 transition-colors">
      {{ primaryButton.text }}
    </a>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
  primaryButton: {
    text: string;
    link: string;
    target?: string;
  };
}>();
</script>