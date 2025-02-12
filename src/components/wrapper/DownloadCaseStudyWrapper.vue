<script setup>
import { defineProps } from "vue";
import Heading from "../core/Heading.vue";
import DownloadCaseStudyCard from "../../components/cards/downloadCard.vue";
import CustomSection from "../core/CustomSection.vue";
const props = defineProps({
  items: {
    type: Object,
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
  <CustomSection>
    <div class="mb-2">
      <Heading :title="title" :description="description" align="CENTER" />
    </div>
    <div>
      <DownloadCaseStudyCard :cards="items" />
    </div>
  </CustomSection>
</template>
<style scoped></style>
