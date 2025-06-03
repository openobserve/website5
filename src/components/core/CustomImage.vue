<script setup>

const props = defineProps({
  image: {
    type: [Object, String],
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
  loading :{
    type: String,
    required: false,
    default: "lazy",
  }
});


</script>

<template>
  <img :src="image?.url || image || '/img/default_project_image.png'" :alt="altText || 'Default Image'"
    :class="cssClass" :loading="loading" />
</template>

