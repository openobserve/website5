<template>
   <CustomSection sectionClass="">
    <div class="relative w-full rounded-lg overflow-hidden">
      <div
        class="absolute inset-0 bg-gradient-to-r from-primary-purple to-primary-blue"
      >
      </div>
      <div class="relative z-10 p-8 md:p-12 lg:p-16 flex flex-col space-y-4">
        <div class="flex justify-start">
          <div class="flex flex-wrap gap-2">
            <!-- :href="`/${type}/tag/${tag.slug}`" -->
          <a
            v-for="tag in tags"
            :key="tag.slug"
            class="px-3 py-1 rounded-full bg-white/20 text-white text-sm hover:bg-white/30 backdrop-blur-sm capitalize"
          >
            {{ tag.name }}
          </a>
        </div>
        </div>
        <h1
          class="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white"
        >
          {{ title }}
        </h1>
        <div class="flex items-center text-white/80">
          <span>Published: {{ publishDate }}</span>
          <span class="mx-4">•</span>
          <span>Reading time: {{ calculateReadingTime(content) }}</span>
        </div>
      </div>
    </div>
  </CustomSection>
</template>
<script setup lang="ts">
import { calculateReadingTime } from '@/utils/calculateReadingTime';
import CustomSection from '../core/CustomSection.vue';

const props = defineProps<{
  title: string;
  tags: {
    name: string;
    slug: string;
  }[];
  author: {
    name: string;
    image: {
      url: string;
    };
    slug: string;
  }[];
  publishDate: string;
  content: string;
}>();
</script>