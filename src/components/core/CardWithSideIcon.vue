<script setup lang="ts">
// Card with left side icon, without shadow and border

const props = defineProps<{
  title: string;
  description: string;
  icon: string;
  align?: 'left' | 'center' | 'right';
  theme?: string;
  items?: string[];
}>();
</script>

<template>
  <div :class="[
    'flex items-start gap-4 rounded-xl border border-gray-300 shadow-md p-6',
    props.align === 'center'
      ? 'justify-center text-center'
      : props.align === 'right'
        ? 'justify-end text-right'
        : 'justify-start text-left', // default left
  ]">
    <!-- Icon -->
    <div :class="[
      'p-2 rounded-full flex items-center justify-center w-10 h-10 flex-shrink-0',
      'bg-card dark:bg-card-dark', // Added dark mode support
      props.theme
    ]">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
        v-html="props.icon" />
    </div>

    <!-- Text content -->
    <div>
      <h2 class="text-base font-semibold text-gray-800 dark:text-gray-200">
        {{ props.title }}
      </h2>
      <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
        {{ props.description }}
      </p>
    </div>
  </div>
</template>
