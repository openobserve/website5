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
  <CustomSection>
    <div class="py-10">
      <Heading :title="props.items.title" align="CENTER" />
    </div>

    <CustomFeatureCard :cards="props.items.items" />
  </CustomSection>
</template>
<style scoped></style>
