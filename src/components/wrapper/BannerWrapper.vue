<script setup>
import CustomSection from "../core/CustomSection.vue";
import Heading from "../core/Heading.vue";
import CustomBanner from "../core/CustomBanner.vue";

const props = defineProps({
  // items: {
  //   type: Object,
  //   required: true,
  // },
  bannerTitle: {
    type: String,
    required: false,
  },
  bannerDescription: {
    type: String,
    required: true,
  },
  heading: {
    type: Object,
    required: false,
  },
  primaryButton: {
    type: Object,
    required: true,
  },
  secondaryButton: {
    type: Object,
    default: () => ({}),
  },
  getStartedText: {
    type: String,
    required: false,
  },
  items: {
    type: Array,
    required: false,
  },
});
</script>

<template>
  <CustomSection v-if="heading?.title || heading?.subtitle">
    <Heading
      v-if="heading?.title || heading?.subtitle"
      :title="heading?.title"
      :description="heading?.subtitle"
      align="CENTER"
    />
  </CustomSection>
  <div :class="!heading?.title && 'mt-5'">
    <CustomBanner
      :bannerTitle="bannerTitle"
      :bannerDescription="bannerDescription"
      :primaryButton="primaryButton"
      :secondaryButton="secondaryButton"
      :getStartedText="getStartedText"
      :items="items"
    />
  </div>
</template>
