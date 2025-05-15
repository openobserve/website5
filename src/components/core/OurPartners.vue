<template>
  <section id="our-story">
    <CustomSection>
      <!-- Title with horizontal lines -->
      <FramedTitle :title="title" />
      <p class="text-center text-gray-600 text-lg">{{ description }}</p>
      <!-- Content grid -->
      <div class="grid gap-8 items-center mt-8" :class="gridClass">
        <!-- Image content -->
        <div
          v-for="(logo, index) in images"
          :key="index"
          class="flex-shrink-0 rounded-lg border p-4 flex items-center justify-center h-full w-full"
        >
          <a
            :href="logo.link"
            class="flex items-center justify-center h-full w-full"
          >
            <img :src="logo.url" :alt="logo.alt" class="h-24 w-24" />
          </a>
        </div>
      </div>

      <!-- Read more link -->
      <div class="flex justify-center pt-8" v-if="secondaryButton">
        <a
          :href="secondaryButton.link"
          class="inline-flex items-center text-purple-600 hover:text-purple-800 transition-colors font-medium"
        >
          {{ secondaryButton.text }}
          <svg
            class="ml-2 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path>
          </svg>
        </a>
      </div>
    </CustomSection>
  </section>
</template>
<script setup>
import FramedTitle from "./FramedTitle.vue";
import CustomSection from "./CustomSection.vue";
import { computed } from "vue";
const props = defineProps({
 title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: {
    type: Array,
    required: true,
  },
  secondaryButton: {
    type: Object,
    required: false,
  }
});

const gridClass = computed(() => {
  const count = props?.images?.length;
  return `grid-cols-1 md:grid-cols-2 lg:grid-cols-${Math.max(count,4)} `;
});
</script>
<style scoped></style>
