<script setup>
import { computed } from "vue";

const props = defineProps({
  sectionClass: {
    type: String,
    default: "",
  },
});

const defaultClasses = computed(() => {
  const baseClasses = [
    "container mx-auto px-4 sm:px-6 lg:px-8 xl:px-11",
    "w-full flex flex-col justify-center",
  ];

  const paddingClasses = props.sectionClass
    ? [] // don't add default padding if sectionClass is provided
    : ["py-16 sm:py-16 md:py-16 lg:py-20 xl:py-20"];


  return [...baseClasses, ...paddingClasses, props.sectionClass].join(" ");
});
</script>

<template>
  <div :class="defaultClasses">
    <slot></slot>
  </div>
</template>
