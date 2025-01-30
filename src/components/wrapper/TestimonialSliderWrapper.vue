<script setup>
import CustomTestimonialSlider from "../../components/core/CustomTestimonialSlider.vue";
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
  description: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <div class="bg-dark-blue min-h-screen flex items-center">
    <div
      class="container mx-auto px-4 lg:px-8 flex flex-col lg:flex-row items-center lg:items-start gap-6 py-16"
    >
      <Heading :title="title" :description="description" align="LEFT" />
      <CustomTestimonialSlider :testimonials="items" client:load />
    </div>
  </div>
</template>
<style scoped></style>
