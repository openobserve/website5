<script setup>
import { computed } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  align: {
    type: String,
    default: "CENTER",
    validator: (value) => ["LEFT", "CENTER", "RIGHT"].includes(value),
  },
});

const alignClass = computed(() => {
  const alignment = {
    LEFT: "text-left",
    CENTER: "text-center",
    RIGHT: "text-right",
  };
  return alignment[props.align] || "text-center"; // default to 'text-center'
});
</script>

<template>
  <div class="w-full text-white">
    <h2 class="text-xl lg:text-3xl font-semibold mb-4" :class="alignClass">
      {{ props.title }}
    </h2>
    <p class="text-base lg:text-lg text-gray-500" :class="alignClass">
      {{ props.description }}
    </p>
  </div>
</template>