<script setup>
import CustomSection from "../core/CustomSection.vue";
import CustomSeprater from "../core/CustomSeprater.vue";
import CustomTabsWithImage from "../core/CustomTabsWithImage.vue";
import Heading from "../core/Heading.vue";
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  heading: {
    type: Object,
    required: true,
  },
});

</script>
<template>
  <div>
    <CustomSection>
      <div class="py-10">
        <Heading :title="heading?.title" :description="heading?.subtitle" align="CENTER" />
      </div>
      <CustomTabsWithImage :items="items" />
    </CustomSection>
    <div class="mt-24">
    </div>
  </div>
</template>
<style scoped></style>
