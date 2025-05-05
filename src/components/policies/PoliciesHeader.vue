<template>
  <div class="w-full py-10 px-4 text-white hero-gradient">
    <div class="container max-w-4xl mx-auto md:px-4 lg:px-12">
      <h1 class="text-3xl md:text-4xl font-bold">{{ title }}</h1>
      <p v-if="description" class="text-white/80 mt-2">{{ description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
}>();
</script>
