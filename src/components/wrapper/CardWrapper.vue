<script setup>
import CustomSection from "../core/CustomSection.vue";
import HeadingSection from "../core/HeadingSection.vue";
import CardWithShadowBorder from "../core/CardWithShadowBorder.vue";
import CardWithSideIcon from "../core/CardWithSideIcon.vue";

const props = defineProps({
  title: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  items: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div class="bg-gray-50">
    <CustomSection>
      <div>
        <!-- Heading Section -->
        <HeadingSection
          v-if="title || description"
          :title="title"
          :description="description"
          align="center"
          
        />

        <!-- Cards Section -->
        <div class="grid-container mt-12">
          <!-- CardWithShadowBorder -->
          <CardWithShadowBorder
            v-for="(card, index) in items"
            :key="index"
            :title="card.title"
            :description="card.description"
            :icon="card.icon"
            :buttonText="card.buttonText"
            :buttonLink="card.buttonLink"
            :theme="card.theme"
            :items="card.items"
          class="grid-item" />

          <!-- CardWithSideIcon -->
          <!-- <CardWithSideIcon v-for="(card, index) in cardsData2" :key="index" :title="card.title"
          :description="card.description" :icon="card.icon" :theme="card.theme" :items="card.items" /> -->
        </div>
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