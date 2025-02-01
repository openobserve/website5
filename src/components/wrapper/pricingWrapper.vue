<script setup>
import CustomSection from "../core/CustomSection.vue";
import PricingTiers from "../../components/core/PricingTeir.vue";

const props = defineProps({
  cloudpricingTiers: {
    type: Array,
    required: true,
  },
  selfHostedpricingTiers: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <CustomSection>
    <PricingTiers :tiers="cloudpricingTiers" />
  </CustomSection>
</template>

<style scoped></style>
