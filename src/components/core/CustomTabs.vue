<script setup>
import { onMounted, ref, watch, onUnmounted, nextTick } from "vue";
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

  // Ensure the selected tab scrolls into view inside the tab container
  // scrollActiveTabIntoView();
};

// Function to scroll active tab into view horizontally
const scrollActiveTabIntoView = () => {
  nextTick(() => {
    const tabElement = tabsContainer.value?.children[activeTabIndex.value];
    if (tabElement) {
      // Get the tab container's dimensions
      const container = tabsContainer.value;
      const containerWidth = container.offsetWidth;
      const containerScrollLeft = container.scrollLeft;

      // Get the tab's position
      const tabOffsetLeft = tabElement.offsetLeft;
      const tabWidth = tabElement.offsetWidth;

      // Check if tab is partially or fully out of view
      if (tabOffsetLeft < containerScrollLeft) {
        // Tab is off the left side
        container.scrollTo({
          left: tabOffsetLeft - 20, // Add some padding
          behavior: "smooth",
        });
      } else if (tabOffsetLeft + tabWidth > containerScrollLeft + containerWidth) {
        // Tab is off the right side
        container.scrollTo({
          left: tabOffsetLeft + tabWidth - containerWidth + 20, // Add some padding
          behavior: "smooth",
        });
      }

      // Update shadows after scrolling
      checkScrollShadows();
    }
  });
};

// New function to handle scroll-based tab activation
const handleScroll = () => {
  const scrollPosition = window.scrollY + window.innerHeight / 2;

  // Find the content section currently in view
  let activeIndex = contentRefs.value.findIndex((ref, index) => {
    if (!ref) return false;

    const rect = ref.getBoundingClientRect();
    const offsetTop = rect.top + window.pageYOffset;
    const offsetBottom = offsetTop + rect.height;

    return scrollPosition >= offsetTop && scrollPosition <= offsetBottom;
  });

  // Update active tab if a valid section is found and it's different from current
  if (activeIndex !== -1 && activeIndex !== activeTabIndex.value) {
    const newSlug = slugify(props.items[activeIndex].title);
    activeTabIndex.value = activeIndex;
    window.history.replaceState(null, "", `#${newSlug}`);

    // Ensure the newly active tab is visible
    scrollActiveTabIntoView();
  }
};

// Add throttling to prevent too frequent scroll updates
const throttle = (func, limit) => {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

const throttledScrollHandler = throttle(handleScroll, 100);

// Add this method to check scroll position
const checkScrollShadows = () => {
  if (tabsContainer.value) {
    const container = tabsContainer.value;

    // Show left shadow only when scrolled to the right
    showLeftShadow.value = container.scrollLeft > 0;

    // Show right shadow only when there's more content to scroll to the right
    showRightShadow.value =
      container.scrollWidth > container.clientWidth &&
      container.scrollLeft < container.scrollWidth - container.clientWidth - 1; // Added small buffer
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

  // Initial check for shadows AFTER the DOM is ready
  nextTick(() => {
    checkScrollShadows();
  });

  // Add scroll event listener
  window.addEventListener("scroll", throttledScrollHandler);
});

// Clean up scroll listener
onUnmounted(() => {
  window.removeEventListener("scroll", throttledScrollHandler);
});

// Watch for hash changes to support manual hash navigation
watch(
  () => window.location.hash,
  (newHash) => {
    const hash = newHash.replace("#", "");
    const tabIndex = props.items.findIndex((tab) => slugify(tab.title) === hash);
    if (tabIndex !== -1) {
      setActiveTab(tabIndex, hash);
    }
  }
);

// Watch active tab index changes to ensure the tab is scrolled into view
watch(
  () => activeTabIndex.value,
  () => {
    scrollActiveTabIntoView();
  }
);

// Initialize contentRefs with the correct number of refs
contentRefs.value = new Array(props.items.length).fill(null);
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
  pointer-events: none; /* Prevent interaction */
  z-index: 5; /* Ensure it is above text */
}

/* Right Shadow */
.right-shadow {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 30px;
  background: linear-gradient(to left, rgb(12, 12, 12) 25%, transparent);
  pointer-events: none; /* Prevent interaction */
  z-index: 5; /* Match left shadow z-index */
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
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
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
