<template>
  <section id="our-story">
    <CustomSection>
      <!-- Title with horizontal lines -->
      <FramedTitle :title="title" />
      <p class="text-center text-gray-600 text-lg">{{ description }}</p>

      <!-- Controls -->
      <div class="flex justify-between items-center my-6">
        <div class="flex space-x-2">
          <!-- Prev Button -->
          <button
            @click="scrollLeft"
            :disabled="isAtStart"
            class="p-2 rounded-lg border"
            :class="{
              'opacity-50 cursor-not-allowed': isAtStart,
              'cursor-pointer': !isAtStart,
            }"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
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
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <!-- Optional Button -->
        <div v-if="secondaryButton">
          <a
            :href="secondaryButton.link"
            class="text-purple-600 hover:text-purple-800 text-sm font-medium inline-flex items-center group"
          >
            {{ secondaryButton.text }}
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>

      <!-- Scrollable Container -->
      <div class="overflow-hidden relative">
        <div
          ref="scrollContainer"
          class="flex overflow-x-auto scroll-smooth no-scrollbar snap-x snap-mandatory space-x-4 pb-4"
        >
          <div
            v-for="(logo, index) in images"
            :key="index"
            class="flex-shrink-0 rounded-lg border p-4 flex items-center justify-center h-full snap-start w-full sm:w-[225px] xl:w-[24%]"
          >
            <div class="flex  flex-col gap-4 items-center justify-center w-full h-full text-gray-600">
              <img :src="logo.url" :alt="logo.alt" class="h-24 w-24" />
              <a href="logo.link" target="_blank" class="hover:text-primary-blue hover:underline">{{ logo.text }}</a>
            </div>
          </div>
        </div>
      </div>
    </CustomSection>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import FramedTitle from "./FramedTitle.vue";
import CustomSection from "./CustomSection.vue";

const props = defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
  images: { type: Array, required: true },
  secondaryButton: { type: Object, required: false },
});

const scrollContainer = ref(null);
const scrollAmount = ref(300);
const isAtStart = ref(true);
const isAtEnd = ref(false);

function scrollLeft() {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({ left: -scrollAmount.value, behavior: "smooth" });
  }
}

function scrollRight() {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({ left: scrollAmount.value, behavior: "smooth" });
  }
}

function updateButtonState() {
  const el = scrollContainer.value;
  if (!el) return;
  isAtStart.value = el.scrollLeft <= 0;
  isAtEnd.value = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;
}

onMounted(() => {
  const firstCard = scrollContainer.value?.querySelector("div");
  if (firstCard) {
    scrollAmount.value = (firstCard).offsetWidth + 16;
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
</style>

