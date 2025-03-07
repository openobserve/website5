<script setup>
import { computed } from "vue";

const props = defineProps({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  align: {
    type: String,
    default: "CENTER",
    validator: (value) => ["LEFT", "CENTER", "RIGHT"].includes(value),
  },
});

// Format title to add <br/> after each period followed by a space
const formattedTitle = computed(() => {
  if (!props.title) return '';

  // Split by periods, but keep the periods with each part
  const parts = props.title.split('.').map((part, index, array) => {
    // Don't add period to the last empty part if title ends with a period
    if (index === array.length - 1 && part === '') return '';
    return part + (index < array.length - 1 ? '.' : '');
  });

  // Join with <br/> but only if there's text after the period
  return parts.map((part, index) => {
    // If it's the last part or the part is just whitespace, don't add <br/>
    if (index === parts.length - 1 || part.trim().endsWith('.')) {
      return part;
    }
    return part + '<br/>';
  }).join('');
});

const alignClass = computed(() => ({
  LEFT: "text-left",
  CENTER: "text-center",
  RIGHT: "text-right",
}[props.align] || "text-center"));
</script>

<template>
  <div class="w-full text-white mt-2">
    <h2 class="text-xl sm:text-2xl md:text-3xl font-semibold" :class="alignClass" v-html="formattedTitle"></h2>
    <p v-if="description" class="text-sm md:text-lg xl:text-xl my-4" :class="alignClass">
      {{ description }}
    </p>
  </div>
</template>
