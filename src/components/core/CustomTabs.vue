<script setup>
import { ref, computed } from "vue";
import CustomSection from "./CustomSection.vue";
import CustomInterChange from "./CustomInterChange.vue";

// Props to receive dynamic data from the parent
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
});

const activeTabIndex = ref(0);

// Method to set the active tab by index
const setActiveTab = (index) => {
  activeTabIndex.value = index;
};

// Computed property to get the current tab content
const activeContent = computed(
  () => props.items[activeTabIndex.value]?.content?.Items || []
);
</script>

<template>
  <section class="text-white bg-black">
    <!-- Tabs Section -->
    <div class="relative max-w-6xl mx-auto px-4">
      <div class="flex overflow-x-auto  gap-6 sm:gap-8 scroll-smooth">
        <!-- Render Tabs -->
        <div
          v-for="(tab, index) in items"
          :key="tab.tabTitle"
          @click="setActiveTab(index)"
          class="relative cursor-pointer text-base sm:text-lg md:text-xl font-medium whitespace-nowrap px-3 py-2"
          :class="{
            'text-blue-500': activeTabIndex === index,
            'text-gray-400 hover:text-gray-300': activeTabIndex !== index,
          }"
        >
          {{ tab.tabTitle }}
          <!-- Bottom Border Indicator -->
          <span
            v-if="activeTabIndex === index"
            class="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 transition-all"
          ></span>
        </div>
      </div>
    </div>

    <!-- Dynamic Content Section -->
    <div class="mt-12">
      <CustomSection>
        <div class="container mx-auto px-4 md:px-10">
          <CustomInterChange
            v-for="(feature, index) in activeContent"
            :key="index"
            :items="feature.Items"
            :title="feature.Title"
            :image="feature.Image"
            :direction="index % 2 === 0 ? 'left' : 'right'"
          />
        </div>
      </CustomSection>
    </div>
  </section>
</template>

<style scoped>
/* Ensures smooth scrolling for tabs on mobile */
.scroll-smooth {
  scroll-behavior: smooth;
}

/* Responsiveness adjustments for tabs on mobile */
@media (max-width: 768px) {
  .tabs {
    font-size: 1rem;
  }
}
</style>
