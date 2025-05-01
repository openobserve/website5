<script setup>
import { computed } from "vue";

// Define props using defineProps
const props = defineProps({
  title: {
    type: String,
    required: false,
  },
  textGradientColor: {
    type: String,
    required: false,
  },
  textSize: {
    type: String,
    required: false,
  },
  padding: {
    type: String,
    required: false,
  },
  align: {
    type: String,
    default: "left",
    validator: (value) => ["left", "center", "right"].includes(value),
  },
});

// Computed property for the class
const computedClass = computed(() => {
  return `font-semibold text-[${props.textSize}px] text-${props.align} ${props.textGradientColor} text-gradient ${props.padding}`;
});
</script>

<template>
  <h2 :class="computedClass">
    {{ title }}
  </h2>
</template>

<style>
.text-gradient {
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>



<!-- <TextGradient
  title="Open Source Observability"
  textSize="[48px]" 
  textGradientColor="bg-gradient-blue"
  align="center"
/> -->