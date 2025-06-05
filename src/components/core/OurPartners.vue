<template>
  <section id="our-story">
    <CustomSection>
      <!-- Title with horizontal lines -->
      <FramedTitle :title="heading.title" />
      <p class="text-center text-gray-600 text-lg">{{ heading.description }}</p>

      <!-- Controls (secondary button only) -->
      <div class="flex justify-end items-center my-6">
        <div v-if="secondaryButton">
          <a
            :href="secondaryButton.link"
            class="text-purple-600 hover:text-purple-800 text-sm font-medium inline-flex items-center group"
          >
            {{ secondaryButton.text }}
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

      <!-- Scrollable Container with Side Arrows -->
      <div class="overflow-hidden relative w-full">
        <!-- Left Arrow -->
        <button
          v-if="showLeftArrow"
          @click="scrollLeft"
          :disabled="isAtStart"
          class="absolute top-1/2 -translate-y-1/2 z-10 p-2 rounded-full shadow-md transition-opacity text-white bg-primary-blue"
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

        <!-- Right Arrow -->
        <button
          v-if="showRightArrow"
          @click="scrollRight"
          :disabled="isAtEnd"
          class="absolute right-6 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full shadow-md transition-opacity text-white bg-primary-blue"
          :class="{
            'opacity-50 cursor-not-allowed': isAtEnd,
            'cursor-pointer': !isAtEnd,
          }"
          style="margin-right: -24px"
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

        <div
          ref="scrollContainer"
          @scroll="checkArrows"
          class="flex overflow-x-auto scroll-smooth no-scrollbar snap-x snap-mandatory space-x-5 pb-4 items-stretch w-full"
        >
          <div
            v-for="(logo, index) in items"
            :key="index"
            class="flex-shrink-0 rounded-lg border p-4 flex flex-col snap-start w-full md:w-[220px] xl:w-[23.7%] 3xl:xl:w-[23.8%]"
          >
            <!-- Card content wrapper that ensures uniform layout -->
            <div
              class="flex flex-col justify-between h-full w-full text-gray-600 items-center text-center gap-2"
            >
              <!-- Image -->
              <div class="flex justify-center">
                <img
                  :src="logo.image?.url"
                  :alt="logo.image?.alt"
                  class="h-24 w-24"
                  fetchPrority="high"
                />
              </div>

              <!-- Name & Role -->
              <div class="flex flex-col flex-1">
                <a
                  :href="logo.link"
                  target="_blank"
                  class="hover:text-primary-blue hover:underline font-semibold flex items-center justify-start"
                >
                  {{ logo.name }}
                </a>
                <p class="">{{ logo.role || "" }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CustomSection>
  </section>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import FramedTitle from "./FramedTitle.vue";
import CustomSection from "./CustomSection.vue";

const props = defineProps({
  heading: { type: Object, required: true },
  description: { type: String, required: true },
  items: { type: Array, required: true },
  secondaryButton: { type: Object, required: false },
});

const scrollContainer = ref(null);
const showLeftArrow = ref(false);
const showRightArrow = ref(false);
const scrollAmount = ref(300);
const isAtStart = ref(true);
const isAtEnd = ref(false);

const checkArrows = () => {
  const el = scrollContainer.value;
  if (!el) return;

  showLeftArrow.value = el.scrollLeft > 0;
  showRightArrow.value = el.scrollLeft + el.clientWidth < el.scrollWidth;
};

function scrollLeft() {
  if (!scrollContainer.value) return;

  const el = scrollContainer.value;
  const target = el.scrollLeft - scrollAmount.value;

  el.scrollTo({
    left: target,
    behavior: "smooth",
  });
}

function scrollRight() {
  if (!scrollContainer.value) return;

  const el = scrollContainer.value;
  const target = el.scrollLeft + scrollAmount.value;

  el.scrollTo({
    left: target,
    behavior: "smooth",
  });
}

function updateButtonState() {
  const el = scrollContainer.value;
  if (!el) return;
  isAtStart.value = el.scrollLeft <= 0;
  isAtEnd.value = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;
}

onMounted(() => {
  nextTick(() => {
    scrollContainer.value?.scrollBy({ left: 1 });
    scrollContainer.value?.scrollBy({ left: -1 });
  });
  const firstCard = scrollContainer.value?.querySelector("div");
  checkArrows();
  window.addEventListener("resize", checkArrows);
  if (firstCard) {
    scrollAmount.value = firstCard.offsetWidth + 16;
  }
  updateButtonState();
  scrollContainer.value?.addEventListener("scroll", updateButtonState);
});
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Ensure arrows are visible and not overlapping content */
button.absolute {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}
</style>
