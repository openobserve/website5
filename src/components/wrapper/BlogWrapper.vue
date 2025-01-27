<script setup>
import CustomSectionBackground from "../core/CustomSectionBackground.vue";
import CustomSection from "../core/CustomSection.vue";
import CaseStudyWrapper from "./CaseStudyWrapper.vue";
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  title: {
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
   
      <CaseStudyWrapper
        :items="items"
        :title="title"
        :description="description"
      />
  </CustomSectionBackground>
</template>
