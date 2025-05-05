<template>
  <CustomSection sectionClass="max-w-4xl !pt-12 !pb-0">
    <div class="bg-light-gray dark:bg-accent rounded-lg p-6 mb-10">
      <h2 class="text-xl font-semibold text-primary-black dark:text-white mb-4">
        Table of Contents
      </h2>
      <nav class="space-y-2">
        <a
          v-for="(item, index) in items"
          :key="item.id"
          :href="'#' + item.id"
          class="block text-primary-purple dark:text-primary-blue hover:underline"
        >
          {{ index + 1 }}. {{ item.title }}
        </a>
      </nav>
    </div>
  </CustomSection>
  </template>
  
  <script setup lang="ts">
  import CustomSection from "../core/CustomSection.vue";
  defineProps<{
    items: {
      id: string;
      title: string;
    }[];
  }>();
  </script>
  