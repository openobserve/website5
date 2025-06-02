<script setup lang="ts">
// with shadow and border and without bg color
import CustomButton from "./CustomButton.vue";
import { Check } from "lucide-vue-next";
import { computed } from "vue";
import { ChevronRight } from "lucide-vue-next";
import CustomImage from "./CustomImage.vue";

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

// const props = defineProps<{
//   title: string;
//   description: string;
//   icon: string;
//   buttonText?: string;
//   buttonLink?: string;
//   align?: string; // Changed from strict union type to string
//   theme?: string;
//   items?: string[];
//   headingLevel?: number; // optional here
// }>();

// Compute heading level with validation and default to 3
const headingLevel = computed(() => {
  return props.headingLevel &&
    props.headingLevel >= 1 &&
    props.headingLevel <= 6
    ? props.headingLevel
    : 3;
});
// Dynamically determine component type based on the presence of a link
const dynamicComponent = computed(() => (props?.card?.link ? "a" : "div"));
</script>

<template>
  <component :is="dynamicComponent" :href="props?.card?.link" :target="props?.card?.target ? '_blank' : null" :class="[
    'relative rounded-xl p-6 flex flex-col border border-gray-300 shadow-md', props.card?.link
      ? 'hover:shadow-xl transition duration-300 ease-in-out'
      : '',
    ['LEFT', 'CENTER', 'RIGHT'].includes(props?.card?.align || 'LEFT')
      ? props?.card?.align === 'CENTER'
        ? 'items-center text-center'
        : props?.card?.align === 'RIGHT'
          ? 'items-end text-right'
          : 'items-start text-left'
      : 'items-start text-left', // default if align is not one of the three
  ]">
    <!-- Icon -->
    <div :class="[
      'p-2 rounded-full mb-4 flex items-center justify-center w-10 h-10 bg-card',
      props?.card?.theme,
    ]">
      <!-- <span v-html="props?.card?.url" /> -->
      <CustomImage v-if="props?.card?.image?.url" :src="props?.card?.image?.url"
        :alt="props?.card?.image?.alternativeText" />
    </div>

    <!-- Title -->
    <component :is="`h${headingLevel}`" class="text-lg font-semibold text-gray-800">
      {{ props?.card?.title }}
    </component>

    <!-- Description -->
    <p class="my-4 text-gray-600 text-sm">
      {{ props?.card?.description }}
    </p>

    <!-- Array of Items with Lucide Check Icons -->
    <ul v-if="props?.card?.items" class="space-y-2 text-gray-600 text-sm mt-auto mb-3">
      <li v-for="(listItem, listIndex) in props?.card?.items" :key="listIndex" class="flex items-start">
        <Check class="h-5 w-5 mr-2 bg-green-500/20 rounded-full p-1 flex-shrink-0 text-green-500" />
        <span>{{ listItem?.title }}</span>
      </li>
    </ul>

    <!-- Optional Arrow Link -->
    <div v-if="props?.card?.button" class="mt-auto">
      <CustomButton size="small" :buttonLink="props?.card?.link"
        :btn-class="props?.card?.button?.theme || 'bg-primary text-white hover:bg-primary-dark'">
        <span class="flex items-center text-sm">
          {{ props?.card?.button?.text }}
          <ChevronRight class="h-4 w-4 ml-2" />
        </span>
      </CustomButton>
    </div>
    <!-- Top-right Arrow Icon (Visible only if there's a link) -->
    <div v-if="props?.card?.link" class="absolute top-3 md:top-5 right-3 md:right-5">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
        <path fill="#000000"
          d="M16.15 13H5q-.425 0-.712-.288T4 12t.288-.712T5 11h11.15L13.3 8.15q-.3-.3-.288-.7t.288-.7q.3-.3.713-.312t.712.287L19.3 11.3q.15.15.213.325t.062.375t-.062.375t-.213.325l-4.575 4.575q-.3.3-.712.288t-.713-.313q-.275-.3-.288-.7t.288-.7z" />
      </svg>
    </div>
  </component>
</template>
