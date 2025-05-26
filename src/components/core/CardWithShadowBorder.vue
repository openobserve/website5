<script setup lang="ts">
// with shadow and border and without bg color
import CustomButton from "./CustomButton.vue";
import { Check } from "lucide-vue-next";
import { computed } from "vue";
import { ChevronRight } from "lucide-vue-next";

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
 <component :is="dynamicComponent" :href="props?.card?.link" :target="props?.card?.target ? '_blank' : null"
    :class="[
      'rounded-xl p-6 flex flex-col border border-gray-300 shadow-md', card.button?.link
                  ? 'hover:shadow-xl transition duration-300 ease-in-out'
                  : '',
      ['left', 'center', 'right'].includes(props?.card?.align || 'left')
        ? props?.card?.align === 'center'
          ? 'items-center text-center'
          : props?.card?.align === 'right'
          ? 'items-end text-right'
          : 'items-start text-left'
        : 'items-start text-left', // default if align is not one of the three
    ]"
  >
    <!-- Icon -->
    <div
      :class="[
        'p-2 rounded-full mb-4 flex items-center justify-center w-10 h-10 bg-card',
        props?.card?.theme,
      ]"
    >
      <span v-html="props?.card?.icon" />
    </div>

    <!-- Title -->
    <component
      :is="`h${headingLevel}`"
      class="text-lg font-semibold text-gray-800"
    >
      {{ props?.card?.title }}
    </component>

    <!-- Description -->
    <p class="my-4 text-gray-600 text-sm">
      {{ props?.card?.description }}
    </p>

    <!-- Array of Items with Lucide Check Icons -->
    <ul v-if="props?.card?.items" class="space-y-2 text-gray-600 text-sm mt-auto mb-3">
      <li
        v-for="(listItem, listIndex) in props?.card?.items"
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
    <div v-if="props?.card?.buttonLink" class="mt-auto">
      <CustomButton
        size="small"
        :buttonLink="props?.card?.buttonLink"
        :btn-class="props?.card?.theme"
      >
        <span class="flex items-center text-sm">
          {{ props?.card?.buttonText }}
          <ChevronRight class="h-4 w-4 ml-2" />
        </span>
      </CustomButton>
    </div>
  </component>
</template>
