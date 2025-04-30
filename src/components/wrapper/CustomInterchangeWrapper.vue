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
  <CustomSection sectionClass="py-0 sm:py-0 md:py-0 lg:py-0 xl:py-0">
      <div v-for="(card, index) in interchangeCard" :key="index">
        <CustomInterchange
          :heading="card.heading"
          :cardData="card.cardData"
          :items="card.items"
          :direction="card.direction || 'left'"
        />
      </div>
      </CustomSection>  
</template>
