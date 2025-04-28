<template>
  <section class="w-full text-black  py-12 md:py-16">
    <div class="container mx-auto px-4">
      <h2 class="text-2xl md:text-3xl font-bold mb-8">{{ block.title }}</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SupportCard v-for="option in block.options" :key="option.id" :option="option" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { CommunitySupportBlock } from '@/types/Contactus';
import SupportCard from '@/components/contactus/SupportCard.vue';
defineProps<{
  block: CommunitySupportBlock;
}>();
</script>