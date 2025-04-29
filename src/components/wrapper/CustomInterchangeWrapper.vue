<script setup>
import CustomInterchange from "../core/CustomInterchange.vue";
import CustomSection from "../core/CustomSection.vue";

const props = defineProps({
  interchangeCard: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <CustomSection>
      <div v-for="(card, index) in interchangeCard" :key="index" class="py-4">
        <CustomInterchange
          :heading="card.heading"
          :cardData="card.cardData"
          :items="card.items"
          :direction="card.direction || 'left'"
        />
      </div>
  </CustomSection>
</template>
