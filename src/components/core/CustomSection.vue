<template>
  <div :class="[defualtClasses, props.sectionClass || '']">
    <slot></slot>
  </div>
</template>
<script setup>
import { computed } from "vue";

const props = defineProps({
  sectionClass: String,
});
const defualtClasses = computed(() => {
  return ["container mx-auto px-10 md:py-10 md:py-10", props.sectionClass].join("");
});
</script>
