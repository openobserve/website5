<template>
  <section
    class="w-full py-16 md:py-24"
    :style="{
      background: `linear-gradient(to right, ${
        block.backgroundGradient?.from || '#4F46E5'
      }, ${block.backgroundGradient?.to || '#06B6D4'})`,
    }"
  >
    <div class="container mx-auto px-4 text-center">
      <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
        {{ block.title }}
      </h1>
      <p class="text-white/90 max-w-2xl mx-auto text-sm md:text-base">
        {{ block.subtitle }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { HeroBlock } from '@/types/Contactus';

defineProps<{
  block: HeroBlock;
}>();
</script>