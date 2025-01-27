<script setup>
import CustomFeatureCard from "../cards/CustomFeatureCard.vue";
import CustomSection from "../core/CustomSection.vue";
import Heading from "../core/Heading.vue";
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  noOfGridColumn:{
    type: Number,
    required: true,
  }
});
</script>
<template>
  <CustomSection>
    <div class="py-10">
      <Heading :title="title" :description="description" align="CENTER" />
    </div>
    <div
      :class="[
        `grid grid-cols-2 md:grid-cols-2 lg:grid-cols-${noOfGridColumn}  gap-10 w-full`,
      ]"
    >
      <CustomFeatureCard :cards="items" />
    </div>
  </CustomSection>
</template>
