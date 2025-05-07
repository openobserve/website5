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
  <CustomSection sectionClass="">
    <div class="flex flex-col gap-3 lg:gap-8">
      <div v-for="(card, index) in items" :key="index">
        <CustomInterchange
          :heading="card.heading"
          :cardData="card.cardData"
          :items="card.items"
          :direction="card.direction || 'left'"
          :theme="card.theme"
        />
      </div>
    </div>
      </CustomSection>  
</template>
