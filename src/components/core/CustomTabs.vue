<script setup>
import { ref, computed } from "vue";
import CustomSection from "./CustomSection.vue";
import CustomInterChange from "./CustomInterChange.vue";
// Props to receive dynamic data from the parent
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  tabs: {
    type: Array,
    required: true, // Tabs header
  },
  tabContents: {
    type: Object,
    required: true, // Content for each tab. Should be an object with keys matching tab names.
  },
});

const activeTab = ref(props.tabs[0]); // Default active tab

// Method to set the active tab
const setActiveTab = (tab) => {
  activeTab.value = tab;
};

// Computed property to get the current tab content
const activeContent = computed(() => props.tabContents[activeTab.value]);
console.log(setActiveTab, activeContent);
</script>

<template>
  <section class="text-white bg-black">
    <!-- Title Section -->
    <div class="text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
        {{ title }}
      </h1>
      <p class="text-lg sm:text-xl md:text-2xl font-medium">{{ subtitle }}</p>
    </div>

    <!-- Tabs Section -->
    <div class="relative max-w-6xl mx-auto">
      <div class="flex justify-center gap-6 sm:gap-8 border-b border-gray-600">
        <!-- Render Tabs -->
        <div
          v-for="tab in tabs"
          :key="tab"
          @click="setActiveTab(tab)"
          class="relative pb-2 cursor-pointer text-base sm:text-lg md:text-xl font-medium"
          :class="{
            'text-blue-500': activeTab === tab,
            'text-gray-400 hover:text-gray-300': activeTab !== tab,
          }"
        >
          {{ tab }}
          <!-- Bottom Border Indicator -->
          <span
            v-if="activeTab === tab"
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
/* Responsive Design for Tabs */
@media (min-width: 768px) {
  .tabs {
    font-size: 1.125rem; /* Text-lg for medium screens */
  }
}
</style>
