<template>
  <!-- <CustomSection sectionClass=""> -->
  <section class="py-12 md:py-16 mb-6 hero-gradient">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-11 relative z-10">
      <article class="">
        <!-- Tags -->
        <div class="flex flex-wrap gap-2 mb-4">
          <a
            v-for="tag in tags"
            :key="tag.slug"
            :href="`/${type}/tag/${tag.slug}`"
            class="px-3 py-1 rounded-full bg-white/20 text-white text-sm hover:bg-white/30 backdrop-blur-sm capitalize"
          >
            {{ tag.name }}
          </a>
        </div>
        <!-- Title -->
        <h1
          class="text-xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-white"
        >
          {{ title }}
        </h1>
        <div class="flex items-center text-white/80">
          <span>Published: {{ publishDate }}</span>
          <span class="mx-4">•</span>
          <span>Reading time: {{ calculateReadingTime(content) }}</span>
        </div>
      </article>
    </div>
  </section>

  <!-- CaseStudy Cover Image -->
  <section class="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-11 mb-6">
    <div class="">
      <figure
        class="relative aspect-[16/9] rounded-lg overflow-hidden shadow-xl"
      >
        <img
          :src="caseStudyImage"
          :alt="title"
          class="object-cover w-full h-full"
        />
      </figure>
    </div>
  </section>
  <!-- </CustomSection> -->
</template>
<script setup lang="ts">
import { calculateReadingTime } from "@/utils/calculateReadingTime";
import CustomSection from "../core/CustomSection.vue";

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
  caseStudyImage: string;
  type: string;
}>();
</script>
