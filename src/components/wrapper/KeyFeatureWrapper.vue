<script setup>
import { slugify } from "@/utils/slugify";
import CustomImage from "../core/CustomImage.vue";
import CustomSection from "../core/CustomSection.vue";
import Heading from "../core/Heading.vue";

const props = defineProps({
  heading: {
    type: Object,
    required: false,
  },
  items: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <CustomSection>
    <div class="grid-container md:px-4 md:-mt-20 md:z-10">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="grid-item rounded-3xl w-full h-full p-[0.0625rem] bg-gradient-blue transition-all duration-300 shadow-2xl hover:shadow-[0_0_60px_0_rgba(66,174,255,0.8)]"
      >
        <!-- Content Layer -->
        <div
          class="grid bg-gray-800 rounded-3xl p-6 h-full transition-colors"
        >
          <!-- Icon and Title Row -->
          <div class="flex items-center space-x-4 mb-3">
            <!-- Icon/Logo -->
            <CustomImage
              v-if="item?.image"
              :image="item?.image"
              :altText="item.title || ''"
              class="w-10 h-10"
            />
            <!-- Title -->
            <h3 class="text-white font-medium text-lg">{{ item.title }}</h3>
          </div>

          <!-- Description -->
          <p class="text-gray-300 text-sm" v-html="item?.description"></p>
        </div>
      </div>
    </div>
  </CustomSection>
</template>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
}

.grid-item {
  background-color: #e5e7eb;
  text-align: center;
  grid-column: span 2;
}

/* Special case for last row */
.grid-item:last-child:nth-child(3n + 1) {
  grid-column: 3 / 5; /* Single last item centered */
}

.grid-item:nth-last-child(2):nth-child(3n + 1) {
  grid-column: 2 / 4; /* First of two last items */
}

.grid-item:nth-last-child(1):nth-child(3n + 2) {
  grid-column: 4 / 6; /* Second of two last items */
}

/* Responsive Layouts */

/* For tablets (2 columns) */
@media (max-width: 1024px) {
  .grid-container {
    grid-template-columns: repeat(6, 4fr);
  }
  .grid-item {
    grid-column: span 3;
  }
  .grid-item:last-child:nth-child(3n + 1) {
    grid-column: span 3; /* Single last item centered */
    grid-column-start: 2;
    grid-column-end: 6;

  }
}

/* For mobile devices (1 column) */
@media (max-width: 640px) {
  .grid-container {
    grid-template-columns: repeat(6, 1fr);
  }
  .grid-item {
    grid-column: span 6;
  }
  .grid-item:last-child:nth-child(3n + 1) {
    grid-column: span 6; /* Single last item centered */
  }
}
</style>
