<script setup>

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
  <img :src="image?.url || image || '/img/default_project_image.png'" :alt="image?.alternativeText || 'Default Image'"
    :class="cssClass" loading="lazy" />
</template>
c