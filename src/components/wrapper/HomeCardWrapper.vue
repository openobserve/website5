<script setup lang="ts">
import CardWithShadowBorder from "../core/CardWithShadowBorder.vue";
import CustomSection from "../core/CustomSection.vue";
import HeadingSection from "../core/HeadingSection.vue";

const props = defineProps<{
  align: string; // Changed from strict union type to string
  heading?: {
    title?: string;
    description?: string;
  };
  background?: boolean;
  items: Array<{
    title: string;
    description: string;
    image: Object;
    button?: {
      text?: string;
      link?: string;
      target?: string;
    };
    theme?: string;
    items?: string[];
  }>;
  headingLevel?: string;
}>();
</script>

<template>
  <div :class="background ? 'bg-gray-50' : ''">
    <CustomSection sectionClass="!py-10 lg:!py-12">
      <div class="" v-if="props?.heading?.title || props?.heading?.description">
        <HeadingSection
          :title="props?.heading?.title"
          :description="props?.heading?.description"
          align="center"
        />
      </div>
      <div class="grid-container">
        <CardWithShadowBorder
          v-for="(card, index) in props.items"
          :key="index"
          :card="{ ...card, align }"
          :headingLevel="props.headingLevel"
          class="w-full grid-item block h-full"
        />
      </div>
    </CustomSection>
  </div>
</template>
<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(6, minmax(auto, 1fr));
  /* Adjust the number of columns */
  gap: 1.5rem;
  justify-content: start;
  /* Center the grid items */
  grid-auto-flow: dense;
  /* Make sure the last row fills gaps */
}

.grid-item {
  display: flex;
  justify-content: center;
  grid-column: span 2;
}

@media (min-width: 768px) and (max-width: 1023px) {
  .grid-container {
    grid-template-columns: repeat(4, minmax(auto, 1fr));
    /* Adjust the number of columns */
  }

  .grid-item:nth-last-child(1):nth-child(odd) {
    /* grid-column: 1 / -1; */
    grid-column-end: -2;
  }
}

@media (max-width: 767px) {
  .grid-container {
    grid-template-columns: repeat(1, minmax(auto, 1fr));
    /* Adjust the number of columns */
  }
}

@media (min-width: 1024px) {
  /* Optional: Add a counter if you need to display item numbers */
  .grid-item:last-child:nth-child(3n - 1) {
    grid-column-end: -2;
    /* Span across the last 2 columns */
  }

  .grid-item:nth-last-child(2):nth-child(3n + 1) {
    grid-column-end: 4;
    /* Span across the 4th column */
  }

  .grid-item:last-child:nth-child(3n - 2) {
    grid-column-end: 5;
    /* Span across the 5th column */
  }
}
</style>
