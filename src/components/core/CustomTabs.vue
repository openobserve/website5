<script setup>
import { onMounted, ref, watch, onUnmounted, nextTick, watchEffect } from "vue";
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
const tabsContainer = ref(null);
const showLeftShadow = ref(false);
const showRightShadow = ref(false);
let observer = null; // To store Intersection Observer instance

// Method to set the active tab by index and update the URL hash
const setActiveTab = (index, slug) => {
  if (activeTabIndex.value === index) return; // Prevent redundant updates

  activeTabIndex.value = index;
  window.history.pushState(null, "", `#${slug}`);

  // Ensure the selected tab scrolls into view inside the tab container
  nextTick(() => {
    const tabElement = tabsContainer.value?.children[index];
    if (tabElement) {
      tabElement.scrollIntoView({ behavior: "smooth", inline: "center" });
    }
  });
};

// Function to check scroll shadows in tab container
const checkScrollShadows = () => {
  if (tabsContainer.value) {
    const container = tabsContainer.value;
    showLeftShadow.value = container.scrollLeft > 0;
    showRightShadow.value =
      container.scrollWidth > container.clientWidth &&
      container.scrollLeft < container.scrollWidth - container.clientWidth - 1;
  }
};

// Setup Intersection Observer to detect visible sections
const setupIntersectionObserver = () => {
  if (observer) observer.disconnect(); // Cleanup previous observer if any

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = contentRefs.value.findIndex((el) => el === entry.target);
          if (index !== -1) {
            setActiveTab(index, slugify(props.items[index].title));
          }
        }
      });
    },
    {
      root: null, // Observe in viewport
      // root: document.querySelector("#scrollArea"),
      rootMargin: "0px 0px -50% 30px", // Trigger when 50% of the element is visible
      threshold: 1.0,
    }
  );

  // Observe each content section
  contentRefs.value.forEach((el) => {
    if (el) observer.observe(el);
  });
};

// Function to scroll the first visible tab into view
// const scrollToFirstVisibleTab = () => {
//   const firstVisibleIndex = contentRefs.value.findIndex((el) => {
//     return el && el.getBoundingClientRect().top >= 0; // Check if the element is visible
//   });
//   console.log("firstVisibleIndexxxxxxxxxxxxxx",firstVisibleIndex);

//   if (firstVisibleIndex !== -1) {
//     setActiveTab(firstVisibleIndex, slugify(props.items[firstVisibleIndex].title));
//   }
// };

onMounted(() => {
  checkScrollShadows();
  setupIntersectionObserver();
  // scrollToFirstVisibleTab(); // Scroll to the first visible tab on mount
});

watch(props.items, () => {
  setupIntersectionObserver();
});

onUnmounted(() => {
  if (observer) observer.disconnect();
});
</script>

<template>
  <section class="text-white">
    <!-- Tabs Section -->
    <div class="sticky-tabs flex justify-center backdrop-blur-3xl">
      <div class="relative max-w-full mx-auto flex flex-row">
        <!-- Left Shadow -->
        <div v-if="showLeftShadow" class="absolute left-shadow"></div>

        <div
          ref="tabsContainer"
          @scroll="checkScrollShadows"
          class="flex overflow-x-auto gap-5 lg:gap-6 scroll-smooth hide-scrollbar"
        >
          <div
            v-for="(tab, index) in items"
            :key="slugify(tab.title)"
            @click="setActiveTab(index, slugify(tab.title))"
            class="relative cursor-pointer text-sm md:text-base lg:text-xl font-medium whitespace-nowrap py-2"
            :class="{
              'text-white': activeTabIndex === index,
              'text-gray-200 hover:text-gray-300': activeTabIndex !== index,
            }"
          >
            <a :href="`#${slugify(tab.title)}`">{{ tab.title }}</a>
            <span
              v-if="activeTabIndex === index"
              class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-text transition-all"
            ></span>
          </div>
        </div>

        <!-- Right Shadow -->
        <div v-if="showRightShadow" class="right-shadow"></div>
      </div>
    </div>

    <!-- Dynamic Content Section -->
    <div class="">
      <!-- Render all content from all tabs -->
      <div
        v-for="(tab, tabIndex) in items"
        :key="slugify(tab.title)"
        :ref="(el) => (contentRefs[tabIndex] = el)"
        class="mb-8 md:mb-0"
      >
        <CustomInterChange
          :key="slugify(tab.title)"
          :items="tab.items"
          :title="tab.title"
          :image="tab.image"
          :direction="tabIndex % 2 === 0 ? 'left' : 'right'"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Left Shadow - Ensure it's above text */
.left-shadow {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 30px;
  background: linear-gradient(to right, rgb(12, 12, 12) 25%, transparent);
  pointer-events: none;
  /* Prevent interaction */
  z-index: 5;
  /* Ensure it is above text */
}

/* Right Shadow */
.right-shadow {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 30px;
  background: linear-gradient(to left, rgb(12, 12, 12) 25%, transparent);
  pointer-events: none;
  /* Prevent interaction */
  z-index: 5;
  /* Match left shadow z-index */
}

/* Ensure shadows are only visible on mobile */
/* @media (min-width: 768px) {
  .left-shadow,
  .right-shadow {
    display: none;
  }
} */

/* Update the existing sticky-tabs style */
.sticky-tabs {
  position: sticky;
  top: 65px;
  z-index: 30;
  width: 100%;
}

@media (max-width: 768px) {
  .sticky-tabs {
    top: 58px;
  }
}

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
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}

/* Responsiveness adjustments for tabs on mobile */
@media (max-width: 768px) {
  .tabs {
    font-size: 1rem;
    top: 58px;
  }
}

.gradient-text {
  display: inline-block;
  background: linear-gradient(to left, rgb(var(--blue-light)), rgb(var(--blue-dark)));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
