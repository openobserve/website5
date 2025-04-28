<template>
  <section class="bg-gradient-to-r from-primary-purple to-primary-blue py-16 md:py-24">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-3xl md:text-5xl font-bold mb-6 text-white">{{ block.title }}</h1>
        <p class="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
          {{ block.subtitle }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { HeroBlock } from '@/types/Contactus';

defineProps<{
  block: HeroBlock;
}>();
</script>