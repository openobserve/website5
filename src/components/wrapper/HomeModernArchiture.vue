<script setup lang="ts">
import CardWithShadowBorder from "../core/CardWithShadowBorder.vue";
import CardWithSideIcon from "../core/CardWithSideIcon.vue";
import CustomSection from "../core/CustomSection.vue";
import HeadingSection from "../core/HeadingSection.vue";
import LaptopviewArchitectureSVG from "../core/LaptopviewArchitectureSVG.vue";
import MobileviewArchitectureSVG from "../core/MobileviewArchitectureSVG.vue";

interface Item {
  title: string;
  description: string;
  
  icon: string;
  theme: string;
}

defineProps<{
  title: string;
  description?: string;
  background?: boolean;
  image?: { url: string; alt: string };
  items: Item[];
}>();
</script>

<template>
  <div :class="background ? 'bg-gray-50' : ''">
  <CustomSection sectionClass="!py-3 lg:!py-12">
    <HeadingSection :title="title" :description="description" class="!mb-2 lg:!mb-2" />
    <div class="flex flex-col md:flex-row items-center justify-center w-full">
      <div class="w-full h-full">

       <!-- desktop screen -->
      <LaptopviewArchitectureSVG class="mx-auto w-full lg:w-2/3 h-auto rounded-lg hidden md:block"/>
        <!-- <img
          :src="image.url"
          :alt="image.alt"
          class="w-full h-full object-cover rounded-lg"
        /> -->

        <!-- Mobile screen -->
      <MobileviewArchitectureSVG class="w-full h-full rounded-lg block md:hidden" />
      </div>
    </div>
    <!-- <div class="grid-container" v-if="items">
      <CardWithShadowBorder
        v-for="(card, index) in items"
        :key="index"
        :title="card.title"
        :description="card.description"
        :icon="card.icon"
        :theme="card.theme"
        
        class="grid-item bg-white"
      />
    </div> -->
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
