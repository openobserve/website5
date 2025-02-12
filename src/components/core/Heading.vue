<script setup>
import { computed } from "vue";

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

// Computed property to insert a <br> after the period
const formattedTitle = computed(() => {
  return props?.title?.replace(/\.(?=\s)/, ".<br/>"); // Adds <br/> after the first period followed by a space
});

const alignClass = computed(() => {
  const alignment = {
    LEFT: "text-left",
    CENTER: "text-left md:text-center",
    RIGHT: "text-right",
  };
  return alignment[props.align] || "text-center"; // default to 'text-center'
});
</script>

<template>
  <div class="w-full text-white mt-2">
    <h2
      class="text-xl sm:text-2xl md:text-3xl font-semibold"
      :class="alignClass"
      v-html="formattedTitle"
    ></h2>

    <p
      class="text-sm md:text-lg xl:text-xl my-4"
      :class="alignClass"
    >
      {{ props.description }}
    </p>
  </div>
</template>

<style scoped>
/* Tailwind handles responsiveness, so no need for custom CSS */
</style>
