<template>
    <section :id="id" class="scroll-mt-20">
      <h2 class="text-2xl font-bold text-primary-black dark:text-white mb-4">
        {{ number }}. {{ title }}
      </h2>
      <div v-html="content" class="text-primary-gray dark:text-muted-foreground space-y-4" />
    </section>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    id: string;
    number: number;
    title: string;
    content: string;
  }>();
  </script>
  