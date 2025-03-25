<script setup>
import CustomStory from "../core/CustomStory.vue";
import CustomSectionBackground from "../core/CustomSectionBackground.vue";
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <CustomSectionBackground direction="bottom">
    <CustomStory :title="title" :image="image" :description="description" direction="right" />
  </CustomSectionBackground>
</template>
