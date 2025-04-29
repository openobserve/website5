<script setup>
import CustomSection from "../core/CustomSection.vue";
import HeadingSection from "../core/HeadingSection.vue";
import Cards from "../core/Cards.vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  cardsData: {
    type: Array,
    required: true,
  },
});
</script>
<template>
<CustomSection>
  <div>
    <!-- Heading Section -->
    <HeadingSection :title="title" :description="description" align="center" />
    <!-- Cards Section -->
    <Cards :data="cardsData" />
  </div>
  </CustomSection>
</template>