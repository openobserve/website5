<script setup>
import CustomSection from "../core/CustomSection.vue";
import CustomFeatureCard from "../cards/CustomFeatureCard.vue";
import Heading from "../core/Heading.vue";
const props = defineProps({
  items: {
    type: Object,
    required: true,
  },
});
</script>
<template>
  <div
    class="py-10 bg-cover bg-no-repeat overflow-visible"
    style="
      background-image: url('/Platform/FeatureCard-Ellipse 140.svg'),
        url('/Platform/FeatureCard-Ellipse 136.svg');
      background-repeat: no-repeat, no-repeat;
      background-position: bottom center, left center; /* Set positions to avoid cutting */
    "
  >
    <CustomSection>
      <Heading :title="props.items.title" align="CENTER" />
      <CustomFeatureCard
        class="py-10"
        :cards="props.items.items"
        layout="column"
        :columns="4"
      />
    </CustomSection>
  </div>
</template>
<style scoped></style>
