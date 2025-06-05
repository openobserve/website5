<script setup>
import { ref, onMounted, onUnmounted, computed, nextTick } from "vue";
import HeadingSection from "../core/HeadingSection.vue";
import CustomSection from "../core/CustomSection.vue";
import ImagePopup from '@/components/core/ImagePopup.vue'

const props = defineProps({
  heading: {
    type: Object,
    required: true,
  },
  items: {
    type: Array,
    required: false,
    default: () => []
  },
  background: {
    type: Boolean,
    required: false,
    default: false
  },
});

// Computed for better reactivity
const activeTabIndex = ref(0);
const autoRotate = ref(true);
const sectionRef = ref(null);
const showPopup = ref(false);
const popupImageSrc = ref("");

// Use computed for active tab to avoid array searches
const activeTab = computed(() => props.items[activeTabIndex.value]);

// Memoize tab content to avoid re-rendering
const tabContentKey = computed(() => `tab-${activeTabIndex.value}`);

function openPopup(src) {
  if (!src) return;
  popupImageSrc.value = src;
  showPopup.value = true;
  document.addEventListener("keydown", handleKeydown, { passive: true });
}

const closeDialog = () => {
  showPopup.value = false;
  document.removeEventListener("keydown", handleKeydown);
};

const handleKeydown = (event) => {
  if (event.key === "Escape") {
    closeDialog();
  }
};

let interval = null;

// Optimized rotation function using index instead of string comparison
const rotateToNextTab = () => {
  if (props.items.length === 0) return;
  activeTabIndex.value = (activeTabIndex.value + 1) % props.items.length;
};

// Optimized tab setting using index
const setActiveTab = (index) => {
  if (index === activeTabIndex.value) return; // Avoid unnecessary updates
  activeTabIndex.value = index;
  if (autoRotate.value) {
    autoRotate.value = false;
    clearAutoRotate();
  }
};

// Separate function for clearing interval
const clearAutoRotate = () => {
  if (interval) {
    clearInterval(interval);
    interval = null;
  }
};

// Throttled interaction handler to prevent excessive calls
let interactionTimeout = null;
const handleInteraction = () => {
  if (!autoRotate.value) return;

  if (interactionTimeout) return; // Throttle rapid interactions

  interactionTimeout = setTimeout(() => {
    autoRotate.value = false;
    clearAutoRotate();
    interactionTimeout = null;
  }, 100);
};

onMounted(async () => {
  // Wait for DOM to be ready
  await nextTick();

  if (autoRotate.value && props.items.length > 1) {
    interval = setInterval(rotateToNextTab, 10000);
  }

  const sectionElement = sectionRef.value;
  if (sectionElement) {
    // Use passive listeners for better performance
    sectionElement.addEventListener("click", handleInteraction, { passive: true });
    sectionElement.addEventListener("touchstart", handleInteraction, { passive: true });
  }
});

onUnmounted(() => {
  clearAutoRotate();

  if (interactionTimeout) {
    clearTimeout(interactionTimeout);
  }

  document.removeEventListener("keydown", handleKeydown);

  const sectionElement = sectionRef.value;
  if (sectionElement) {
    sectionElement.removeEventListener("click", handleInteraction);
    sectionElement.removeEventListener("touchstart", handleInteraction);
  }
});
</script>

<template>
  <div ref="sectionRef" :class="{ 'bg-gray-50': background }">
    <CustomSection sectionClass="!pb-0">
      <HeadingSection :title="heading?.title" :description="heading?.description" align="CENTER" />
      <div class="w-full">
        <!-- Optimized tab buttons with index-based keys -->
        <div class="grid w-full grid-cols-2 md:grid-cols-4 h-auto p-0 bg-transparent gap-2">
          <button v-for="(tab, index) in items" :key="`tab-btn-${index}`" @click="setActiveTab(index)" :class="[
            'py-3 flex flex-col items-center gap-2 font-semibold transition-colors rounded-lg cursor-pointer',
            activeTabIndex === index
              ? 'bg-primary-purple text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
          ]" :aria-selected="activeTabIndex === index" :tabindex="activeTabIndex === index ? 0 : -1" role="tab">
            <span>{{ tab.title }}</span>
          </button>
        </div>

        <!-- Single active tab content instead of v-show for all -->
        <div class="mt-8" :key="tabContentKey">
          <div v-if="activeTab"
            class="bg-white rounded-lg shadow px-8 py-16 flex flex-col lg:flex-row items-center justify-between w-full gap-4">
            <div class="w-full lg:w-1/2">
              <h2 class="text-2xl font-bold mb-2">{{ activeTab.title }}</h2>
              <p v-if="activeTab.description" class="text-gray-600 mb-6">
                {{ activeTab.description }}
              </p>
              <div v-if="activeTab.items?.length" class="">
                <ul class="space-y-2 mb-6">
                  <li v-for="(feature, index) in activeTab.items" :key="`feature-${index}`"
                    class="flex flex-col justify-start space-y-2 items-start">
                    <h3 v-if="feature.title" class="text-lg font-semibold text-gray-800 mb-2">
                      {{ feature.title }}
                    </h3>
                    <p v-if="feature.description" class="text-gray-600 mb-2">
                      {{ feature.description }}
                    </p>
                  </li>
                </ul>
              </div>
            </div>

            <!-- Lazy load images and add loading states -->
            <div class="w-full lg:w-1/2" v-if="activeTab.featureImage?.url">
              <div
                class="w-full aspect-[16/9] p-3 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center cursor-zoom-in"
                @click="openPopup(activeTab.featureImage.url)" role="button"
                :aria-label="`View ${activeTab.featureImage.alternativeText || activeTab.title} in popup`">
                <img :src="activeTab.featureImage.url" :alt="activeTab.featureImage.alternativeText || activeTab.title"
                  class="w-full h-auto object-cover rounded-lg" loading="lazy" decoding="async"
                  style="image-rendering: auto;" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </CustomSection>
  </div>

  <!-- Only render popup when needed -->
  <Teleport to="body">
    <ImagePopup v-if="showPopup" :src="popupImageSrc" :visible="showPopup" @close="closeDialog" />
  </Teleport>
</template>

<style scoped>
/* Optimized styles with better performance */
.bg-gray-50 {
  background-color: #f9fafb;
}

/* Use transform for better performance on hover effects */
button:hover {
  transform: translateY(-1px);
  transition: transform 0.2s ease;
}

/* Optimize image rendering */
img {
  will-change: transform;
}
</style>