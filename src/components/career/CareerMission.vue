<template>
  <div class="max-w-4xl mx-auto py-12 px-4 text-center">
    <p class="text-gray-600">{{ text }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  text: string;
}>();
</script>