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
});
</script>

<template>
  <CustomSection>
    <!-- <div class="w-full bg-[url('/faqBg2.svg')] bg-cover bg-center bg-no-repeat"> -->
      <Heading :title="props.items.title" align="CENTER" />
      <FAQSection :faqItems="props.items.items" />
    <!-- </div> -->
  </CustomSection>
</template>
