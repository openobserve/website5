<script setup>
import { ref, defineProps } from "vue";
import FAQSection from "./FAQSection.vue";
import CustomSection from "../core/CustomSection.vue";
import Heading from "../core/Heading.vue";
const props = defineProps({
  faqs: {
    type: Array,
    required: true,
  },
  heading: {
    type: Object,
    required: false,
  },
});
</script>

<template>
  <div class="py-7">
    <CustomSection
      class="relative bg-opacity-80 backdrop-blur-lg shadow-lg rounded-lg glass-card"
    >
      <Heading :title="props?.title" align="CENTER" />
      <FAQSection :faqItems="props.faqs" />
    </CustomSection>
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
