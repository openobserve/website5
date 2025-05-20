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
  <!-- <CustomSection sectionClass=""> -->
    <div class="flex flex-col">
      <div v-for="(card, index) in items" :key="index" :class="index % 2 == 0 ? 'bg-gray-50' : ''">
      <CustomSection>
        <CustomInterchange
          :heading="card.heading"
          :cardData="card.cardData"
          :items="card.items"
          :direction="card.direction || 'left'"
          :theme="card.theme"
          class=""
          :id="card.id"
        />
        </CustomSection>
      </div>
    </div>
      <!-- </CustomSection>   -->
</template>
