<script setup>
import { slugify } from "@/utils/slugify";
import CustomInterchange from "../core/CustomInterchange.vue";
import CustomSection from "../core/CustomSection.vue";
import { computed } from "vue";
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
});

const cardIds = computed(() => {
  return props.items.map((item) => slugify(item.heading.title));
});
</script>

<template>
  <div class="flex flex-col">
    <div>
      <!-- Each card tracks its own visibility -->
      <div
        v-for="(card, index) in items"
        :key="index"
        :class="index % 2 === 0 ? 'bg-gray-50' : ''"
      >
        <CustomSection>
          <CustomInterchange
            :heading="card.heading"
            :cardData="card.cardData"
            :items="card.items"
            :direction="card.direction || 'LEFT'"
            :theme="card.theme"
            :id="cardIds[index]"
          />
        </CustomSection>
      </div>
    </div>
  </div>
</template>
