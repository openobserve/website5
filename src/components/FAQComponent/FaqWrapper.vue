<script setup>
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
    required: true,
  },
});
</script>

<template>
  <CustomSection>
    <!-- <div class="w-full bg-[url('/img/bg/gradient-bg/faqBg.svg')] bg-cover bg-center bg-no-repeat"> -->
    <Heading :title="heading?.title" align="CENTER" />
    <FAQSection :faqItems="faqs" />
    <!-- </div> -->
  </CustomSection>
</template>
