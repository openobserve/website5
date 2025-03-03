<script setup>
import CustomTestimonial from "../core/CustomTestimonial.vue";

const props = defineProps({
  items: {
    type: Object,
    required: true,
  },
  heading: {
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
  <section class="py-4 md:py-12 px-2">
    <div class="flex flex-col md:flex-row justify-between items-center gap-20">
      <CustomTestimonial :testimonials="items" client:load />
    </div>
  </section>
</template>

<style scoped></style>
