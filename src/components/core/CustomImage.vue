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

console.log(props?.image,"Props Image Classs");

</script>

<template>
  <img
    :src="image?.url || '/img/default_project_image.png'"
    :alt="altText || image?.alt || 'Default Image'"
    :class="cssClass"
  />
</template>
