<script setup>
import CustomFeatureCard from "../cards/CustomFeatureCard.vue";
import CustomSection from "../core/CustomSection.vue";
import Heading from "../core/Heading.vue";
const props = defineProps({
  heading: {
    type: Object,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  noOfGridColumns: {
    type: Number,
    required: true,
  },
});
</script>
<template>
  <CustomSection>
    <Heading :title="heading?.title" :description="heading?.subtitle" align="CENTER" />
    <div
      :class="[
        `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${noOfGridColumns}  gap-10 w-full mt-10`,
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
