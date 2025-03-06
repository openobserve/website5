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
const formattedTitle = computed(() => props.title.replace(/\.(?=\s)/g, ".<br/>"));

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
