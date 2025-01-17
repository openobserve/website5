<template>
  <div
    :class="defaultClasses"
    :style="{ 
      borderColor: borderColor, 
      width: containerSize, 
      height: containerSize 
    }"
  >
    <img
      :src="imgSrc"
      alt="Image"
      class="rounded-full mx-auto"
      :height="iconSize"
      :width="iconSize"
    />
    <slot></slot>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  class: String, // User-defined class
  imgSrc: {
    // Image source prop
    type: String,
    required: true,
  },
  containerSize: {
    type: String,
    required: true, // Size of the container (round shape)
  },
  iconSize: {
    type: String,
    required: true, // Size of the image/icon inside the container
  },
  borderColor: {
    // Border color prop
    type: String,
    default: "#000000", // Default border color (black)
  },
});

const defaultClasses = computed(() => {
  return [
    "container mx-auto px-10",       // Default centering
    "rounded-full",                   // Round shape for the container
    "border-2",                       // Border thickness (adjust as needed)
    "flex items-center justify-center", // Flexbox to center content
    "overflow-hidden",                 // Ensures image doesn't overflow container
  ].join(" ");
});
</script>

<style scoped>
/* Ensures the image fits properly inside the round container */
img {
  object-fit: cover;   /* The image will cover the container without distortion */
  border-radius: 50%;   /* Ensures the image itself is round */
}
</style>
