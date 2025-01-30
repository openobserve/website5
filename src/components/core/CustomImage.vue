<script setup>
import { computed } from "vue";

const props = defineProps({
  image: {
    type: Object,
    required: false,
    default: () => null,
  },
  altText: {
    type: String,
    required: false,
    default: "",
  },
  cssClass: {
    type: String,
    required: false,
    default: "",
  },
});

</script>

<template>
  <img
    :src="image || '/img/default_project_image.png'"
    :alt="altText || image?.alt || 'Default Image'"
    :class="cssClass"
  />
</template>
