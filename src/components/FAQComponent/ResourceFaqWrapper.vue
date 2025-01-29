<script setup>
import { ref, defineProps } from "vue";
import FAQSection from "./FAQSection.vue";
import CustomSection from "../core/CustomSection.vue";
import Heading from "../core/Heading.vue";
const props = defineProps({
  items: {
    type: Object,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <CustomSection
    class="relative bg-opacity-80 backdrop-blur-lg shadow-lg rounded-lg glass-card -mt-32"
  >
    <Heading :title="props.title" align="CENTER" />
    <FAQSection :faqItems="props.items" />
  </CustomSection>
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
