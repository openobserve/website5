<script setup lang="ts">
import { computed } from 'vue';
import CustomImage from './CustomImage.vue';

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
// Dynamically determine component type based on the presence of a cardLink
const dynamicComponent = computed(() => (props?.card?.cardLink ? "a" : "div"));
</script>

<template>
  <component :is="dynamicComponent" :href="props?.card?.cardLink" :target="props?.card?.target ? '_blank' : null" :class="[
    'relative flex items-start gap-4 rounded-xl border border-gray-300 shadow-md p-6',
    props?.card?.cardLink ? 'hover:shadow-xl transition duration-300 ease-in-out' : '',
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
      <CustomImage v-if="props?.card?.image?.url" :src="props?.card?.image?.url"
        :alt="props?.card?.image?.alternativeText" class="h-6 w-6 object-contain" />
      <!-- <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
        v-html="props?.card?.image" /> -->
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
    <!-- Top-right Arrow Icon (Visible only if there's a cardLink) -->
<div v-if="props?.card?.cardLink" class="absolute top-3 md:top-5 right-3 md:right-5">
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
    viewBox="0 0 24 24">
    <path fill="#000000"
      d="M16.15 13H5q-.425 0-.712-.288T4 12t.288-.712T5 11h11.15L13.3 8.15q-.3-.3-.288-.7t.288-.7q.3-.3.713-.312t.712.287L19.3 11.3q.15.15.213.325t.062.375t-.062.375t-.213.325l-4.575 4.575q-.3.3-.712.288t-.713-.313q-.275-.3-.288-.7t.288-.7z" />
  </svg>
</div>
  </component>
</template>
