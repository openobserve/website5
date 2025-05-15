<script setup lang="ts">
// with background color, without border and shadow

import CustomButton from "./CustomButton.vue";
import { Check } from "lucide-vue-next";
import { computed } from "vue";
const props = defineProps<{
  title: string;
  description: string;
  icon: string;
  buttonText?: string;
  buttonLink?: string;
  align?: string; // Changed from strict union type to string
  theme?: string;
  items?: string[];
  headingLevel?: number; // optional here
}>();

// Compute heading level with validation and default to 3
const headingLevel = computed(() => {
  return props.headingLevel && props.headingLevel >= 1 && props.headingLevel <= 6
    ? props.headingLevel
    : 3;
});
</script>

<template>
  <div
    :class="[
      'rounded-xl p-6 flex flex-col bg-gray-50',
      ['left', 'center', 'right'].includes(props.align || 'left')
        ? props.align === 'center'
          ? 'items-center text-center'
          : props.align === 'right'
          ? 'items-end text-right'
          : 'items-start text-left'
        : 'items-start text-left', // default if align is not one of the three
    ]"
  >
    <!-- Icon -->
    <div
      :class="[
        'p-2 rounded-full mb-4 flex items-center justify-center w-10 h-10 bg-card',
        props.theme,
      ]"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-10 w-10"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        v-html="props.icon"
      />
    </div>

    <!-- Title -->
    <component
      :is="`h${headingLevel}`"
      class="text-lg font-semibold text-gray-800"
    >
      {{ props.title }}
    </component>

    <!-- Description -->
    <p class="my-4 text-gray-600 text-sm">
      {{ props.description }}
    </p>

    <!-- Array of Items with Lucide Check Icons -->
    <ul v-if="props.items" class="space-y-2 text-gray-600 text-sm mt-auto mb-3">
      <li
        v-for="(listItem, listIndex) in props.items"
        :key="listIndex"
        class="flex items-start"
      >
        <Check
          class="h-5 w-5 mr-2 bg-green-500/20 rounded-full p-1 flex-shrink-0 text-green-500"
        />
        <span>{{ listItem }}</span>
      </li>
    </ul>

    <!-- Optional Arrow Link -->
    <div v-if="props.buttonLink" class="mt-auto w-1/2">
      <CustomButton
        size="small"
        :buttonText="props.buttonText"
        :buttonLink="props.buttonLink"
        :btn-class="props.theme"
      />
    </div>
  </div>
</template>
