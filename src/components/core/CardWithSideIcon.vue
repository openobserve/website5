<script setup lang="ts">
import { computed } from 'vue';

// Card with left side icon, without shadow and border
const props = defineProps({
  card: {
    type: Object,
    required: true,
  },
  headingLevel: { 
    type: Number,
    required: false,
  }
});
const headingLevel = computed(() => {
  return props.headingLevel && props.headingLevel >= 1 && props.headingLevel <= 6
    ? props.headingLevel
    : 3;
});
// Dynamically determine component type based on the presence of a link
const dynamicComponent = computed(() => (props?.card?.link ? "a" : "div"));
</script>

<template>
  <component :is="dynamicComponent" :href="props?.card?.link" :target="props?.card?.target ? '_blank' : null" :class="[
    'flex items-start gap-4 rounded-xl border border-gray-300 shadow-md p-6', props?.card?.link ? 'hover:shadow-xl transition duration-300 ease-in-out' : '',
    ['left', 'center', 'right'].includes(props.card?.align || 'left')
      ? props?.card?.align === 'center'
        ? 'items-center text-center'
        : props?.card?.align === 'right'
          ? 'items-end text-right'
          : 'items-start text-left'
      : 'items-start text-left', // default if align is not one of the three
  ]">
    <!-- Icon -->
    <div :class="[
      'p-2 rounded-full flex items-center justify-center w-10 h-10 flex-shrink-0',
      'bg-card', // Added dark mode support
      props?.card?.theme
    ]">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
        v-html="props?.card?.icon" />
    </div>

    <!-- Text content -->
    <div>
       <component
      :is="`h${headingLevel}`"
      class="text-lg font-semibold text-gray-800"
    >
      {{ props?.card?.title }}
    </component>
      <p class="text-sm text-gray-600 mt-1">
        {{ props?.card?.description }}
      </p>
    </div>
  </component>
</template>
