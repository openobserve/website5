<script setup lang="ts">
import CardWithShadowBorder from "../core/CardWithShadowBorder.vue";
import CardWithSideIcon from "../core/CardWithSideIcon.vue";
import CustomSection from "../core/CustomSection.vue";
import HeadingSection from "../core/HeadingSection.vue";
import SVGComponent from "../core/SVGComponent.vue";

interface Item {
  title: string;
  description: string;
  icon: string;
  theme: string;
}

defineProps<{
  title: string;
  description?: string;
  image: { url: string; alt: string };
  items: Item[];
}>();
</script>

<template>
  <CustomSection>
    <HeadingSection :title="title" :description="description" />
    <div class="flex flex-col md:flex-row items-center justify-center mb-16 w-full">
      <div class="w-full h-full">
      <SVGComponent class="w-full h-full rounded-lg"/>
        <!-- <img
          :src="image.url"
          :alt="image.alt"
          class="w-full h-full object-cover rounded-lg"
        /> -->
      </div>
    </div>
    <div class="grid-container">
      <CardWithShadowBorder
        v-for="(card, index) in items"
        :key="index"
        :title="card.title"
        :description="card.description"
        :icon="card.icon"
        :theme="card.theme"
        
        class="grid-item"
      />
    </div>
  </CustomSection>
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
  text-align: start;
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
