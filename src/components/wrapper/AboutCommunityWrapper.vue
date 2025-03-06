<script setup>
import { defineProps } from "vue";
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
  <CustomSectionBackground direction="top">
    <CustomStory :title="title" :image="image" :description="description" direction="left" />
  </CustomSectionBackground>
</template>
