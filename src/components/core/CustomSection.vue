<template>
  <div :class="[defualtClasses, props.class || '']">
    <slot></slot>
  </div>
</template>
<script setup>
import { computed } from "vue";

const props = defineProps({
  class: String,
});
const defualtClasses = computed(() => {
  return ["container mx-auto px-10 md:py-10 md:py-10", props.class].join("");
});
</script>
