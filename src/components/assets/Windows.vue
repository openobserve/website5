<template>
   <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M0,0 L10,1.2 L10,11.4 L0,11.4 L0,0 Z M11,1.4 L24,3.4 L24,11.4 L11,11.4 L11,1.4 Z M0,12.6 L10,12.6 L10,22.8 L0,24 L0,12.6 Z M11,12.6 L24,12.6 L24,20.6 L11,22.6 L11,12.6 Z" />
        </svg>
</template>

<script setup>
defineProps({
  svgClass: {
    type: [String, Array, Object],
    default: "",
  },
});
</script>
