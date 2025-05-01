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
  <div v-for="(card, index) in interchangeCard" :key="index"
    :class="card.direction === 'left' ? 'bg-white' : 'bg-gray-100'">
    <CustomSection sectionClass="py-0 sm:py-0 md:py-0 lg:py-0 xl:py-0">
      <div>
        <CustomInterchange :heading="card.heading" :cardData="card.cardData" :items="card.items"
          :direction="card.direction || 'left'" />
      </div>
    </CustomSection>
  </div>
</template>
