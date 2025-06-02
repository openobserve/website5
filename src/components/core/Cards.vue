<script setup lang="ts">
// without shadow, border and background color 

import CustomImage from "./CustomImage.vue";
import CustomButton from "./CustomButton.vue";
import { Check } from 'lucide-vue-next';
import { computed } from 'vue';

const props = defineProps<{
  title: string;
  description: string;
  icon: any;
  buttonText?: string;
  buttonLink?: string;
  align?: 'left' | 'center' | 'right';
  theme?: string;
  items?: string[];
  headingLevel?: number;
}>();
const headingLevel = computed(() => {
  return props.headingLevel && props.headingLevel >= 1 && props.headingLevel <= 6
    ? props.headingLevel
    : 3;
});
</script>

<template>
  <div :class="[
    'rounded-xl p-2 lg:p-6 flex flex-col gap-4',
    props.align === 'center'
      ? 'items-center text-center'
      : props.align === 'right'
        ? 'items-end text-right'
        : 'items-start text-left', // default to left
  ]">
    <!-- Icon -->
    <div :class="[
      'p-2 rounded-full flex items-center justify-center w-10 h-10 bg-card',
      props.theme
    ]">
      <CustomImage v-if="props?.icon?.url" :src="props?.icon?.url"
        :alt="props?.icon?.alternativeText" />
    </div>

    <!-- Title -->
    <component :is="`h${headingLevel}`" class="text-lg font-semibold text-gray-800">
      {{ props.title }}
    </component>

    <!-- Description -->
    <p class="text-gray-600 text-sm">
      {{ props.description }}
    </p>

    <!-- Array of Items with Lucide Check Icons -->
    <ul v-if="props.items" class="space-y-2 text-gray-600 text-sm mt-auto mb-3">
      <li v-for="(listItem, listIndex) in props.items" :key="listIndex" class="flex items-start">
        <Check class="h-5 w-5 mr-2 bg-green-500/20 rounded-full p-1 flex-shrink-0 text-green-500" />
        <span>{{ listItem }}</span>
      </li>
    </ul>

    <!-- Optional Arrow Link -->
    <div v-if="props.buttonLink" class="mt-auto w-1/2">
      <CustomButton size="small" :buttonText="props.buttonText" :buttonLink="props.buttonLink"
        :btn-class="props.theme" />
    </div>
  </div>
</template>
