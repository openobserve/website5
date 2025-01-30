<script setup>
import CustomSectionBackground from "../core/CustomSectionBackground.vue";
import CustomSection from "../core/CustomSection.vue";
import CaseStudyWrapper from "./CaseStudyWrapper.vue";
const props = defineProps({
  heading:{
    type:Object,
    required:true,
  },
});
</script>
<template>
  <CustomSectionBackground direction="top">
      <CaseStudyWrapper
        :title="heading.title"
        :description="heading.subtitle"
      />
  </CustomSectionBackground>
</template>
