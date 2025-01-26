<script setup>
import CustomSection from "../core/CustomSection.vue";
import Heading from "../core/Heading.vue";
import CustomTabs from "../core/CustomTabs.vue";
import GetDemoWrapper from "./GetDemoWrapper.vue";
import CustomSeprater from "../core/CustomSeprater.vue";
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
    <Heading
      :title="props.items.title"
      :description="props.items.subtitle"
      align="CENTER"
    />

    <CustomTabs class="py-10" :items="props.items.items" client:load />
    <GetDemoWrapper :title="props.items.getDemoTitle" :btnData="props.items.getDemoButton"/>
  </CustomSection>
  <div>
    <CustomSeprater />
  </div>
  </div>
</template>
<style scoped></style>
