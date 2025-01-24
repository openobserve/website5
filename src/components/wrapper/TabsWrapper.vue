<script setup>
import CustomSection from "../core/CustomSection.vue";
import Heading from "../core/Heading.vue";
import CustomTabs from "../core/CustomTabs.vue";
const props = defineProps({
  items: {
    type: Object,
    required: true,
  },
});
</script>
<template>
  <CustomSection>
    <Heading
      :title="props.items.title"
      :description="props.items.subtitle"
      align="CENTER"
    />
    <CustomTabs
      client:load
      :title="props.items.items.title"
      :subtitle="props.items.items.subtitle"
      :tabs="{ tabs }"
      :tabContents="[featureData, featureData11, featureData, featureData]"
    />
  </CustomSection>
</template>
<style scoped></style>
