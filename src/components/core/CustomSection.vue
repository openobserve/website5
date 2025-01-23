<template>
  <div :class="[defaultClasses, props.sectionClass || '']">
    <slot></slot>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  sectionClass: {
    type: String,
    default: "",
  },
});

const defaultClasses = computed(() => {
  return [
    "container mx-auto px-2 sm:px-6 lg:px-8 xl:px-12", // Handle horizontal padding on different screen sizes
    "py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20", // Handle vertical padding for each breakpoint
    "w-full flex flex-col justify-start", // General layout setup
    props.sectionClass,
  ].join(" ");
});
</script>
