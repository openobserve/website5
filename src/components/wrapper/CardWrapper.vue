<script setup>
import CustomSection from "../core/CustomSection.vue";
import HeadingSection from "../core/HeadingSection.vue";
import CardWithShadowBorder from "../core/CardWithShadowBorder.vue";
import CardWithSideIcon from "../core/CardWithSideIcon.vue";
import { ArrowRight } from "lucide-vue-next";
import FeatureTitle from "../core/FeatureTitle.vue";
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
  background: {
    type: Boolean,
    required: false,
  },
  button: {
    type: Object,
    required: false,
  },
  headingLevel: {
    type: Number,
    default: 3,
  },
  titleItems: {
    type: Array,
    required: false,
  },
});
</script>

<template>
  <div :class="background ? 'bg-gray-50' : ''">
    <CustomSection sectionClass="">
      <div>
        <!-- Heading Section -->
        <FeatureTitle
          v-if="title || description"
          :title="title"
          :description="description"
          align="center"
          :heading-level="headingLevel"
          :items="titleItems"
        />

        <!-- Cards Section -->
        <div class="grid-container">
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
            class="grid-item"
            :heading-level="headingLevel"
          />
          <!-- CardWithSideIcon -->
          <!-- <CardWithSideIcon v-for="(card, index) in cardsData2" :key="index" :title="card.title"
          :description="card.description" :icon="card.icon" :theme="card.theme" :items="card.items" /> -->
        </div>

        <!-- View All Button -->
        <div class="mt-12 flex justify-center w-full" v-if="button">
          <a :href="button.link" :target="button.target || '_self'" class="">
            <button
              :class="button.class"
              class="inline-flex items-center justify-center rounded-md border border-input px-6 py-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer"
            >
              {{ button.text }}
              <ArrowRight class="ml-2 h-4 w-4" />
            </button>
          </a>
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
