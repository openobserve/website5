<script setup>
import CustomSection from "../core/CustomSection.vue";
import Heading from "../core/Heading.vue";
import CustomSupportCard from "../cards/CustomSupportCard.vue";

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  heading: {
    type: Object,
    required: true
  }
});
</script>
<template>
  <CustomSection>
    <div class="py-3">
      <Heading :title="heading?.title" :description="heading?.subtitle" align="CENTER" />
    </div>
    <div
      :class="[
        `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-10 w-full mt-10`,
      ]"
    >
      <CustomSupportCard v-for="item in items" :key="item.id" :card="item" />
    </div>
  </CustomSection>
</template>
