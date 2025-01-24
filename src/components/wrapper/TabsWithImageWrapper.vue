<script setup>
import CustomSection from "../core/CustomSection.vue";
import CustomTabsWithImage from "../core/CustomTabsWithImage.vue";
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
      <Heading
        :title="props.items.title"
        :description="props.items.subtitle"
        align="CENTER"
      />
    </div>
    <CustomTabsWithImage :tabs="props.items.items" client:load />
  </CustomSection>
</template>
<style scoped></style>
