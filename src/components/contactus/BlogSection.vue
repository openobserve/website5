<template>
    <CustomSection>
    <div class="md:pl-1 lg:pl-2">
       <HeadingSection :title="sectionTitle" description="" align="LEFT" />
      </div>
      <div
        class="flex flex-row justify-between items-center w-full md:px-1 lg:px-2 my-6"
        v-show="!loading"
      >
        <div class="flex space-x-2">
          <!-- Prev Button -->
          <button
            @click="scrollLeft"
            :disabled="isAtStart"
            class="p-2 rounded-lg border"
            :class="{ 'opacity-50 cursor-not-allowed': isAtStart }"
          >
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
            :class="{ 'opacity-50 cursor-not-allowed': isAtEnd }"
          >
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
            :href="viewAllLink.url"
            class="text-indigo-400 hover:text-indigo-300 text-sm font-medium inline-flex items-center group"
          >
            {{ viewAllLink.text }}
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

      <div v-if="loading" class="text-center py-10">
        <!-- <svg class="animate-spin h-8 w-8 mx-auto text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg> -->
        <div
          className="h-8 w-8 animate-spin mx-auto rounded-full border-4 border-indigo-500 border-t-transparent"
        ></div>
        <p class="text-sm text-gray-500 mt-2">Loading blog posts...</p>
      </div>
      <div v-else class="overflow-hidden relative">
        <div
          ref="scrollContainer"
          class="flex overflow-x-auto scroll-smooth no-scrollbar snap-x snap-mandatory"
        >
          <div
            v-for="post in allPosts"
            :key="post.id"
            class="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 md:px-2 lg:pr-6 snap-start"
          >
            <BlogCard2 :blog="post" type="blog" />
          </div>
        </div>
      </div>
  </CustomSection>
</template>

<script setup lang="ts">
import { nextTick } from "vue";
import { ref, computed, onMounted } from "vue";
import BlogCard2 from "@/components/blog/BlogCard2.vue";
import { getAllBlogs } from "@/utils/api/blog";
import type { Blog } from "@/types/blog";
import HeadingSection from "../core/HeadingSection.vue";
import CustomSection from "../core/CustomSection.vue";
const loading = ref(true);
const allPosts = ref<Blog[]>([]);
const scrollContainer = ref<HTMLElement | null>(null);

const scrollAmount = ref(300);
const isAtStart = ref(true);
const isAtEnd = ref(false);
function scrollLeft() {
  console.log("scrollLeft");
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({
      left: -scrollAmount.value,
      behavior: "smooth",
    });
  }
}

function scrollRight() {
  console.log("scrollRight");
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
    allPosts.value = await getAllBlogs();
  } catch (err) {
    console.error("Failed to fetch blogs:", err);
  } finally {
    loading.value = false;

    // Wait until DOM updates with loaded blog cards
    await nextTick();

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
// Set section title and view-all link manually
const sectionTitle = "Latest from Our Blogs";
const viewAllLink = {
  url: "/blog",
  text: "View all posts",
};
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
