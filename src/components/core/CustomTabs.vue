<script setup>
import { onMounted, ref, watch, onUnmounted, nextTick } from "vue";
import CustomInterChange from "./CustomInterChange.vue";
import { slugify } from "../../utils/slugify";

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
});

const activeTabIndex = ref(0);
const contentRefs = ref([]);
const tabsContainer = ref(null);
const showLeftShadow = ref(false);
const showRightShadow = ref(false);
let observer = null;

//shadow function on both sides
const checkScrollShadows = () => {
  if (tabsContainer.value) {
    const container = tabsContainer.value;
    showLeftShadow.value = container.scrollLeft > 0;
    showRightShadow.value =
      container.scrollWidth > container.clientWidth &&
      container.scrollLeft < container.scrollWidth - container.clientWidth - 1;
  }
};

const setActiveTab = (index, slug) => {
  if (activeTabIndex.value === index) {
    return;
  }

  activeTabIndex.value = index;
  nextTick(() => {
    const tabElement = tabsContainer.value?.children[index];
    const container = tabsContainer.value;
    if (container) {
      container.scrollTo({
        left:
          tabElement.offsetLeft - container.offsetWidth / 2 + tabElement.offsetWidth / 2,
        behavior: "smooth",
      });
    }

    checkScrollShadows();
  });
};

const setupIntersectionObserver = () => {
  observer = new IntersectionObserver(
    (entries) => {
      const visibleItems = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

      if (visibleItems.length) {
        const firstVisibleIndex = contentRefs.value.findIndex(
          (el) => el === visibleItems[0].target
        );
        if (firstVisibleIndex !== -1 && firstVisibleIndex !== activeTabIndex.value) {
          requestAnimationFrame(() => {
            setActiveTab(
              firstVisibleIndex,
              slugify(props.items[firstVisibleIndex].title)
            );
          });
        }
      }
    },
    {
      root: document.querySelector("tabScrolling"),
      rootMargin: "-10% 0px -40% 0px",
      threshold: [0.4],
    }
  );

  contentRefs.value.forEach((el) => el && observer.observe(el));
};

onMounted(() => {
  checkScrollShadows();
  setupIntersectionObserver();
});

onUnmounted(() => observer?.disconnect());

</script>

<template>
  <section class="text-white" id="tabScrolling">
    <div class="sticky-tabs flex justify-center backdrop-blur-3xl">
      <div class="relative max-w-full mx-auto flex flex-row">
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
            <a :href="'#' + slugify(tab.title)">{{ tab.title }}</a>
            <span
              v-if="activeTabIndex === index"
              class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-text transition-all"
            ></span>
          </div>
        </div>

        <div v-if="showRightShadow" class="right-shadow"></div>
      </div>
    </div>

    <div>
      <div
        v-for="(tab, tabIndex) in items"
        :key="slugify(tab.title)"
        :ref="(el) => (contentRefs[tabIndex] = el)"
        class="mb-8 md:mb-0"
      >
        <CustomInterChange :key="slugify(tab.title)" :items="items" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.left-shadow {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 30px;
  background: linear-gradient(to right, rgb(12, 12, 12) 25%, transparent);
  pointer-events: none;
  z-index: 5;
}

.right-shadow {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 30px;
  background: linear-gradient(to left, rgb(12, 12, 12) 25%, transparent);
  pointer-events: none;
  z-index: 5;
}

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

.scroll-smooth {
  scroll-behavior: smooth;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.gradient-text {
  display: inline-block;
  background: linear-gradient(to left, rgb(var(--blue-light)), rgb(var(--blue-dark)));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
