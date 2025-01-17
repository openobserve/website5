<script setup>
import { computed } from "vue";

// Define props
const props = defineProps({
  variant: {
    type: String,
    default: "primary", // Default variant
  },
  class: {
    type: String,
    default: undefined,
  },

  buttonProps: Object, // Spread other props like form attributes
});

const variants = {
  primary:
    "bg-sky-500 text-white font-inter font-semibold text-sm gradient-hover-effect-primary", // Add transition to smooth the hover effect
  secondary:
    "bg-none text-white border border-white font-inter font-semibold text-sm gradient-hover-effect-secondary",
  tertiary:
    "bg-none text-white font-inter font-semibold gradient-hover-effect-tertiary",
  outline: "text-gray-700 font-inter font-semibold focus:ring-gray-300",
  ghost:
    "border border-transparent text-gray-700 font-semibold rounded-lg hover:bg-gray-100 hover:border-gray-300 transition duration-300",
  transparent: "bg-none text-white font-inter font-semibold",
};

const sizes = {
  small: "px-2 py-1 text-sm",
  medium: "px-4 py-2 text-md",
  large: "px-6 py-3 text-lg",
};

// Compute dynamic button classes
const buttonClasses = computed(() => {
  return [
    "flex justify-center items-center gap-2 text-center p-2 rounded-[24px]", // Base styles
    sizes[props.size], // Size based on props
    variants[props.variant], // Variant based on props
    props.class, // Custom class
  ].join(" ");
});
</script>

<template>
  <button
    :class="[buttonClasses, props.class || '']"
    :disabled="props.disabled || props.loading"
    :type="props.type"
    @click="props.onClick"
    v-bind="props.buttonProps"
  >
    <span class="flex flex-row items-center">
      <slot></slot>
    </span>
  </button>
</template>

<style scoped>
.gradient-hover-effect-primary:hover {
  background: radial-gradient(
    #0079dd,
    #3bb3ff,
    #76dbff
  ); /* Radial gradient for background */
  border: 1px solid;
  border-radius: 24px;
  border-image: linear-gradient(to bottom, #d1fbff, #004883) 1; /* Linear gradient for border */
  box-shadow: 0 0 8px 0 rgba(66, 174, 255, 1); /* Shadow effect */
}

.gradient-hover-effect-secondary:hover {
  background: radial-gradient(
    circle,
    #008bff,
    #35a0fc,
    #99cae9
  ); /* Radial gradient for background */
  border: 1px solid;
  border-radius: 24px;
  border-image: linear-gradient(to bottom, #cef9fe, #024b85) 1; /* Linear gradient for border */
  box-shadow: 0 0 8px 0 rgba(66, 174, 255, 1); /* Shadow effect */
}
.gradient-hover-effect-tertiary:hover {
  background: radial-gradient(
    circle,
    #0076d8,
    #2195fc,
    #caf1ff
  ); /* Radial gradient for background */
  box-shadow: 0 0 8px 0 rgba(66, 174, 255, 1); /* Shadow effect */
}
</style>
