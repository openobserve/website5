<script setup>
import CustomSection from "../core/CustomSection.vue";
import HeadingSection from "../core/HeadingSection.vue";
import CardWithShadowBorder from "../core/CardWithShadowBorder.vue";

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
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <CardWithShadowBorder v-for="(card, index) in props.cardsData"
      :key="index"
      :title="card.title"
      :description="card.description"
      :icon="card.icon"
      :buttonText="card.buttonText"
      :buttonLink="card.buttonLink"
      :theme="card.theme"
      :items="card.items" />
      </div>
  </div>
  </CustomSection>
</template>