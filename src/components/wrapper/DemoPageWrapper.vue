<script setup>
import { defineProps } from "vue";
import GetDemoHeroSection from "../../components/heroSections/GetDemoHeroSection.vue";
import DemoPageFormWrapper from "../../components/wrapper/DemoPageFormWrapper.vue";

// Define props to receive the data from the backend
const props = defineProps({
  heading: {
    type: Object,
    required: true,
  },
  features: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <!-- Destructure the required data for better readability -->
  <GetDemoHeroSection :title="heading?.title" />

  <DemoPageFormWrapper :description="features[0]?.items?.[0]?.description || 'No description available'
    " :keyFeatures="features[0]?.items.map((item) => item.title) || []"
    :keyFeatures2="features[1]?.items.map((item) => item.title) || []" :footerdescription="features[0]?.description || 'No footer description available'
      " client:load />
</template>
