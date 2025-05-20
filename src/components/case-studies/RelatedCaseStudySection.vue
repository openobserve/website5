<template>
  <div class="bg-gray-50">
    <CustomSection>
      <div class="">
        <HeadingSection
          :title="sectionData.title"
          description=""
          align="LEFT"
          class="!mb-12"
        />
      </div>
      <div class="flex flex-row justify-between items-center w-full my-6">
        <div class="flex space-x-2">
          <!-- Prev Button -->
          <button
            @click="scrollLeft"
            :disabled="isAtStart"
            class="p-2 rounded-lg border cursor-pointer"
            :class="{
              'opacity-50 cursor-not-allowed': isAtStart,
              'cursor-pointer': !isAtStart,
            }"
          >
            <span class="sr-only"> Previous </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <!-- Next Button -->
          <button
            @click="scrollRight"
            :disabled="isAtEnd"
            class="p-2 rounded-lg border"
            :class="{
              'opacity-50 cursor-not-allowed': isAtEnd,
              'cursor-pointer': !isAtEnd,
            }"
          >
            <span class="sr-only"> Next </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
        <div class="">
          <a
            :href="sectionData.button.link"
            class="text-indigo-400 hover:text-indigo-300 text-sm font-medium inline-flex items-center group"
          >
            {{ sectionData.button.text }}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 ml-1 transform transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </div>
      <div class="overflow-hidden relative">
        <div
          ref="scrollContainer"
          class="flex overflow-x-auto scroll-smooth no-scrollbar snap-x snap-mandatory"
        >
          <div
            v-for="(post, index) in data"
            :key="post.id"
            class="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 md:px-2 lg:pr-6 snap-start"
          >
            <CaseStudyCard :key="index" :item="post" />
          </div>
        </div>
      </div>
    </CustomSection>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import CaseStudyCard from "./CaseStudyCard.vue";
import HeadingSection from "../core/HeadingSection.vue";
import CustomSection from "../core/CustomSection.vue";

// Define the props for this component
const props = defineProps({
  data: {
    type: Array,
    required: true,
    default: () => [],
  },
  sectionData: {
    type: Object,
    required: false,
    default: () => {},
  }, //used for button and title
});
const scrollContainer = ref<HTMLElement | null>(null);

const scrollAmount = ref(300);
const isAtStart = ref(true);
const isAtEnd = ref(false);

function scrollLeft() {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({
      left: -scrollAmount.value,
      behavior: "smooth",
    });
  }
}

function scrollRight() {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({
      left: scrollAmount.value,
      behavior: "smooth",
    });
  }
}

function updateButtonState() {
  if (!scrollContainer.value) return;

  const el = scrollContainer.value;
  isAtStart.value = el.scrollLeft <= 0;
  isAtEnd.value = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;
}

onMounted(async () => {
  try {
    // Now that blogs are fetched, fetch authors
    // authorsMap.value = await fetchAuthorsMapFromBlogs(props.data);
  } catch (err) {
    console.error("Failed to fetch blogs:", err);
  } finally {
    const firstCard = scrollContainer.value?.querySelector("div");
    if (firstCard) {
      const cardWidth = (firstCard as HTMLElement).offsetWidth;
      scrollAmount.value = cardWidth + 16;
    }

    // Initial check now that DOM is ready
    updateButtonState();

    scrollContainer.value?.addEventListener("scroll", updateButtonState);
  }
});
</script>
<style>
/* Optional: hide scrollbar */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
