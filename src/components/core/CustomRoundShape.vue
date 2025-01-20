<template>
  <div
    :class="defaultClasses"
    :style="{
      borderColor: borderColor,
      width: computedSize,
      height: computedSize,
    }"
  >
    <img
      :src="imgSrc"
      alt="Image"
      :style="{ width: computedIconSize, height: computedIconSize }"
    />
    <slot></slot>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  class: String, // User-defined class for additional styling
  imgSrc: {
    // Image source prop
    type: String,
    required: true,
  },
  size: {
    // Size of the container/icon (e.g., "small", "medium", "large", or a custom pixel value)
    type: String,
    default: "medium", // Default size if not specified
  },
  borderColor: {
    // Border color prop
    type: String,
    default: "", // Default border color
  },
});

const defaultClasses = computed(() => {
  return [  
    "rounded-full", // Round shape for the container
    "border-2", // Border thickness
    "flex items-center justify-center", // Flexbox to center content
    "overflow-hidden", // Prevents image overflow
  ].join(" ");
});

// Define size presets
const sizePresets = {
  small: 65, // Small size (in pixels)
  medium: 100, // Medium size (in pixels)
  large: 150, // Large size (in pixels)
};

// Compute container and icon sizes
const computedSize = computed(() => {
  // If the size prop is a valid number, use it directly; otherwise, fallback to presets
  return isNaN(Number(props.size))
    ? `${sizePresets[props.size] || sizePresets.medium}px`
    : `${props.size}px`;
});

const computedIconSize = computed(() => {
  // Icon size will be slightly smaller than the container size for padding
  const size = parseInt(computedSize.value);
  return `${size * 0.8}px`; // Icon size as 80% of the container size
});
</script>

<style scoped>
/* Ensures the image fits properly inside the round container */
img {
  object-fit: cover; /* The image will cover the container without distortion */
  border-radius: 50%; /* Ensures the image itself is round */
}
</style>
