<script setup>
import CustomSection from "../core/CustomSection.vue";
import CustomSeprater from "../core/CustomSeprater.vue";
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
  <div>
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
    <div class="mt-24">
    <CustomSeprater/>
    </div>
  </div>
</template>
<style scoped></style>
