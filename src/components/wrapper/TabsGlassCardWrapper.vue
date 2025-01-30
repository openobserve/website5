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
  <CustomSection
    class="relative bg-opacity-80 backdrop-blur-lg shadow-lg rounded-lg glass-card"
  >
    <Heading
      :title="props.items.title"
      :description="props.items.subtitle"
      align="CENTER"
    />

    <CustomTabs class="py-10" :items="props.items.items" client:load />
    <div v-if="items.getDemoButton && items.getDemoTitle">
      <GetDemoWrapper
        :title="props.items.getDemoTitle"
        :btnData="props.items.getDemoButton"
      />
    </div>
  </CustomSection>
  <div>
    <CustomSeprater />
  </div>
</template>
<style scoped>
.glass-card {
  border-radius: 16px;
  border-top: 1px solid var(--Glass-stroke, #fff);
  background: linear-gradient(
    180deg,
    rgba(1, 1, 1, 0.48) 29.9%,
    rgba(1, 1, 1, 0.8) 100%
  );
}
</style>
