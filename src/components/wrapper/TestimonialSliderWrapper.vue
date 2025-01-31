<script setup>
import CustomTestimonialSlider from "../../components/core/CustomTestimonialSlider.vue";
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
  description: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <CustomSection class="py-12 md:py-16 lg:py-24">
    <div class="flex justify-between items-center max-w-5xl gap-20">
      <Heading :title="title" :description="description" align="LEFT" />
      <CustomTestimonialSlider :testimonials="items" client:load />
    </div>
  </CustomSection>
</template>

<style scoped></style>
