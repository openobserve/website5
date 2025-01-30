<script setup>
import { computed } from "vue";

// Define props using defineProps
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  textGradientColor: {
    type: String,
    required: true,
  },
  textSize: {
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
  return `font-semibold text-[${props.textSize}px] text-${props.align} ${props.textGradientColor} text-gradient`;
});
</script>

<template>
  <h1 :class="computedClass">
    {{ title }}
  </h1>
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