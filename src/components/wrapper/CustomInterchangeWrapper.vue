<script setup>
import CustomInterchange from "../core/CustomInterchange.vue";
import CustomSection from "../core/CustomSection.vue";

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <CustomSection sectionClass="py-0 sm:py-0 md:py-0 lg:py-0 xl:py-0">
    <div class="flex flex-col gap-16">
      <div v-for="(card, index) in items" :key="index">
        <CustomInterchange
          :heading="card.heading"
          :cardData="card.cardData"
          :items="card.items"
          :direction="card.direction || 'left'"
        />
      </div>
    </div>
      </CustomSection>  
</template>
