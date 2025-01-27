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
  noOfGridColumn: {
    type: Number,
    required: true,
  },
});
</script>
<template>
  <CustomSection>
      <Heading :title="title" :description="description" align="CENTER" />
    <div
      :class="[
        `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${noOfGridColumn}  gap-10 w-full mt-10`,
      ]"
    >
      <div
        class="flex gap-4"
        v-for="(item, index) in items"
        :key="index"
        :class="layout === 'column' ? 'flex-col justify-start' : 'flex-row'"
      >
        <CustomFeatureCard :card="item" />
      </div>
    </div>
  </CustomSection>
</template>
