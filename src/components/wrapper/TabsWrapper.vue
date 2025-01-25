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

    <CustomTabs class="py-10" :items="props.items.items" client:load />
  </CustomSection>
</template>
<style scoped></style>
