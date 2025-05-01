<template>
  <div class="bg-gradient-to-r from-blue-500 to-blue-400 text-white py-16 px-4 text-center">
    <h1 class="text-3xl md:text-4xl font-bold mb-4">{{ title }}</h1>
    <p class="text-lg mb-8 max-w-2xl mx-auto">{{ description }}</p>
    <button class="bg-white text-blue-500 px-6 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors">
      {{ buttonText }}
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
  buttonText: string;

}>();
</script>