<script setup>
import { ref } from "vue";
import CustomSection from "./CustomSection.vue";
import CustomInterChange from "./CustomInterChange.vue";

// Props to receive dynamic data from the parent
const props = defineProps({
  items: {
    type: Array,
    required: true, // Tabs header
  },
});

const activeTabIndex = ref(0);
const contentRefs = ref([]);

// Method to set the active tab by index and scroll to the corresponding content
const setActiveTab = (index) => {
  activeTabIndex.value = index;
  if (contentRefs.value[index]) {
    contentRefs.value[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

// Initialize contentRefs with the correct number of refs
contentRefs.value = new Array(props.items.length).fill(null);
</script>

<template>
  <section class="text-white">
    <!-- Tabs Section -->
    <div class="sticky top-16 z-50 bg-black/90 backdrop-blur-sm">
      <div class="relative max-w-6xl mx-auto px-4">
        <div class="flex overflow-x-auto gap-6 sm:gap-8 scroll-smooth hide-scrollbar">
          <!-- Render Tabs -->
          <div
            v-for="(tab, index) in items"
            :key="tab.title"
            @click="setActiveTab(index)"
            class="relative cursor-pointer text-base sm:text-lg md:text-xl font-medium whitespace-nowrap px-3 py-2"
            :class="{
              'text-blue-500': activeTabIndex === index,
              'text-gray-400 hover:text-gray-300': activeTabIndex !== index,
            }"
          >
            {{ tab.title }}
            <!-- Bottom Border Indicator -->
            <span
              v-if="activeTabIndex === index"
              class="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 transition-all"
            ></span>
          </div>
        </div>
      </div>
    </div>

    <!-- Dynamic Content Section -->
    <div class="">
      <CustomSection>
        <!-- Render all content from all tabs -->
        <div v-for="(tab, tabIndex) in items" :key="tab.title" :ref="el => contentRefs[tabIndex] = el">
          <CustomInterChange
            :key="tabIndex"
            :items="tab.items"
            :title="tab.title"
            :image="tab.image"
            :direction="tabIndex % 2 === 0 ? 'left' : 'right'"
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
/* Hide scrollbar for Chrome, Safari and Opera */
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.hide-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

/* Responsiveness adjustments for tabs on mobile */
@media (max-width: 768px) {
  .tabs {
    font-size: 1rem;
  }
}
</style>