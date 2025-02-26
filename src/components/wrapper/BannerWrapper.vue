<script setup>
import CustomSection from "../core/CustomSection.vue";
import Heading from "../core/Heading.vue";
import CustomBanner from "../core/CustomBanner.vue";

const props = defineProps({
  title: {
    type: String,
    required: false,
  },
  description: {
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
  bottomText: {
    type: String,
    required: false,
  },
  items: {
    type: Array,
    required: false,
  },
  featureTitle: {
    type: String,
    required: false,
  },
  monthlyText: {
    type: String,
    required: false,
  },
});
</script>

<template>
  <div id="main-component">
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
        :bannerTitle="title"
        :bannerDescription="description"
        :primaryButton="primaryButton"
        :secondaryButton="secondaryButton"
        :getStartedText="bottomText"
        :featureTitle="featureTitle"
        :items="items"
        :monthlyText="monthlyText"
      />
    </div>
  </div>
</template>
