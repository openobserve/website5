<script setup lang="ts">
import CustomButton from "./CustomButton.vue";
import CustomSection from "./CustomSection.vue";
import { Check } from 'lucide-vue-next';

const props = defineProps<{
  data: {
    title: string;
    description: string;
    icon: string;
    buttonText?: string;
    buttonLink?: string;
    theme?: string;
    items?: string[];
  }[];
}>();
</script>

<template>
  <CustomSection>
    <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      <div v-for="(item, index) in props.data" :key="index"
        class="rounded-xl p-6 flex flex-col items-left text-left border border-gray-300">
        <!-- Icon -->
        <div :class="[
          'p-2 rounded-full mb-4 flex items-center justify-center w-10 h-10 bg-card',
          item.theme,
        ]">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" v-html="item.icon" />
        </div>

        <!-- Title -->
        <h3 class="text-lg font-semibold text-gray-800">
          {{ item.title }}
        </h3>

        <!-- Description -->
        <p class="my-4 text-gray-600 dark:text-gray-400 text-sm">
          {{ item.description }}
        </p>

        <!-- Array of Items with Lucide Check Icons -->
        <!-- Example of usage in the json data: "items": ["High throughput", "Low latency", "Optimized for modern hardware"] -->
        <ul v-if="item.items" class="space-y-2 text-gray-600 dark:text-gray-400 text-sm mt-auto mb-3">
          <li v-for="(listItem, listIndex) in item.items" :key="listIndex" class="flex items-start">
            <Check class="h-5 w-5 mr-2 bg-green-500/20 rounded-full p-1 flex-shrink-0 text-green-500" />
            <span>{{ listItem }}</span>
          </li>
        </ul>

        <!-- Optional Arrow Link -->
        <div v-if="item.buttonLink" class="mt-auto w-1/2">
          <CustomButton size="small" :buttonText="item.buttonText" :buttonLink="item.buttonLink"
            :btn-class="item.theme" />
        </div>
      </div>
    </div>
  </CustomSection>
</template>