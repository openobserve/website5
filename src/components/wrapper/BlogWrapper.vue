<script setup>
import CustomSectionBackground from "../core/CustomSectionBackground.vue";
import CustomSection from "../core/CustomSection.vue";
import BlogsDataWrapper from "./BlogsDataWrapper.vue";
const props = defineProps({
  heading: {
    type: Object,
    required: false,
  },
});
</script>
<template>
  <CustomSectionBackground direction="top">
    <BlogsDataWrapper
      :title="heading?.title"
      :description="heading?.subtitle"
    />
  </CustomSectionBackground>
</template>
