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

const setActiveTab = (index, slug) => {
  if (activeTabIndex.value === index) return;

  activeTabIndex.value = index;
  window.history.pushState(null, "", "#" + slug);

  nextTick(() => {
    tabsContainer.value?.children[index]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
    checkScrollShadows();
  });
};

const checkScrollShadows = () => {
  if (tabsContainer.value) {
    const container = tabsContainer.value;
    showLeftShadow.value = container.scrollLeft > 0;
    showRightShadow.value =
      container.scrollWidth > container.clientWidth &&
      container.scrollLeft < container.scrollWidth - container.clientWidth - 1;
  }
};

const setupIntersectionObserver = () => {
  observer = new IntersectionObserver(
    (entries) => {
      const visibleItems = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

      if (visibleItems.length) {
        const index = contentRefs.value.findIndex((el) => el === visibleItems[0].target);
        if (index !== -1 && index !== activeTabIndex.value) {
          setActiveTab(index, slugify(props.items[index].title));
        }
      }
    },
    {
      root: null,
      rootMargin: "-10% 0px -40% 0px",
      threshold: [0.4],
    }
  );

  contentRefs.value.forEach((el) => el && observer.observe(el));
};

onMounted(() => {
  checkScrollShadows();
  setTimeout(() => setupIntersectionObserver(), 100);
});

onUnmounted(() => observer?.disconnect());

watch(
  () => props.items,
  () => setTimeout(() => setupIntersectionObserver(), 100),
  { deep: true }
);
</script>

<template>
  <section class="text-white">
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

