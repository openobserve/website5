<script setup>
import CustomInterchange from "../core/CustomInterchange.vue";
import CustomSection from "../core/CustomSection.vue";
import { motion } from "motion-v";

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
});

</script>

<template>
  <div class="flex flex-col">
    <div>
      <!-- Each card tracks its own visibility -->
      <div v-for="(card, index) in items" :key="index" :class="index % 2 === 0 ? 'bg-gray-50' : ''">
        <CustomSection>
          <CustomInterchange :heading="card.heading" :cardData="card.cardData" :items="card.items"
            :direction="card.direction || 'LEFT'" :theme="card.theme" :id="card.id" />
        </CustomSection>
      </div>
    </div>
  </div>
</template>
