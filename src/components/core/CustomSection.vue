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
    "container mx-auto px-4 sm:px-6 lg:px-8 xl:px-11", // Handle horizontal padding on different screen sizes
    "py-16 lg:py-20", // Handle vertical padding for each breakpoint
    "w-full flex flex-col justify-center", // General layout setup
    props.sectionClass,
].join(" ");
});
</script>
<template>
    <div :class="defaultClasses">
      <slot></slot>
    </div>
  </template>
  
  