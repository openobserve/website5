<script setup>
import { onMounted, ref, watch } from "vue";
import CustomSection from "./CustomSection.vue";
import CustomInterChange from "./CustomInterChange.vue";
import { slugify } from "../../utils/slugify";

// Props to receive dynamic data from the parent
const props = defineProps({
  items: {
    type: Array,
    required: true, // Tabs header
  },
});

const activeTabIndex = ref(0);
const contentRefs = ref([]);

// Method to set the active tab by index and update the URL hash
const setActiveTab = (index, slug) => {
  activeTabIndex.value = index;
  window.history.pushState(null, "", `#${slug}`); // Update URL hash without reloading

  if (contentRefs.value[index]) {
    contentRefs.value[index].scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

// Handle direct navigation via hash links
onMounted(() => {
  const hash = window.location.hash.replace("#", ""); // Get the current hash
  if (hash) {
    const tabIndex = props.items.findIndex((tab) => slugify(tab.title) === hash);
    if (tabIndex !== -1) {
      nextTick(() => setActiveTab(tabIndex, hash));
    }
  }
});

// Watch for hash changes to support manual hash navigation
watch(() => window.location.hash, (newHash) => {
  const hash = newHash.replace("#", "");
  const tabIndex = props.items.findIndex((tab) => slugify(tab.title) === hash);
  if (tabIndex !== -1) {
    setActiveTab(tabIndex, hash);
  }
});

// Initialize contentRefs with the correct number of refs
contentRefs.value = new Array(props.items.length).fill(null);
</script>

<template>
  <section class="text-white">
    <!-- Tabs Section -->
    <div class="sticky top-16 z-50 backdrop-blur-2xl">
      <div class="relative max-w-6xl mx-auto px-4">
        <div class="flex overflow-x-auto gap-6 sm:gap-8 scroll-smooth hide-scrollbar">
          <!-- Render Tabs -->
          <div
            v-for="(tab, index) in items"
            :key="slugify(tab.title)"
            @click="setActiveTab(index,slugify(tab.title))"
            class="relative cursor-pointer text-base sm:text-lg md:text-xl font-medium whitespace-nowrap px-3 py-2"
            :class="{
              'text-blue-500': activeTabIndex === index,
              'text-gray-400 hover:text-gray-300': activeTabIndex !== index,
            }"
          >
            <a :href="`#${slugify(tab.title)}`">{{ tab.title }}</a>
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
        <div
          v-for="(tab, tabIndex) in items"
          :key="slugify(tab.title)"
          :ref="(el) => (contentRefs[tabIndex] = el)"
        >
          <CustomInterChange
            :key="slugify(tab.title)"
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
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

/* Responsiveness adjustments for tabs on mobile */
@media (max-width: 768px) {
  .tabs {
    font-size: 1rem;
  }
}
</style>
