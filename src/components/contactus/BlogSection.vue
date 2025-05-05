<template>
  <section class="w-full py-12 md:py-16">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center mb-8">
        <h2 class="text-2xl md:text-3xl font-bold">{{ sectionTitle }}</h2>
        <div class="flex space-x-2">
          <button
            @click="scrollPrev"
            class="p-2 rounded-lg border"
            :disabled="currentIndex === 0"
            :class="{ 'opacity-50 cursor-not-allowed': currentIndex === 0 }"
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
          <button
            @click="scrollNext"
            class="p-2 rounded-lg border"
            :disabled="currentIndex >= allPosts.length - visiblePosts"
            :class="{
              'opacity-50 cursor-not-allowed':
                currentIndex >= allPosts.length - visiblePosts,
            }"
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
      </div>

      <div class="relative overflow-hidden">
        <div
          class="flex transition-transform duration-300 ease-in-out"
          :style="{
            transform: `translateX(-${currentIndex * (100 / visiblePosts)}%)`,
          }"
        >
          <div
            v-for="post in allPosts"
            :key="post.id"
            class="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 p-2"
          >
            <BlogCard :post="post" />
          </div>
        </div>
      </div>

      <div class="mt-8 text-center">
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
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import type { BlogSectionBlock } from "@/types/Contactus";
import BlogCard from "@/components/contactus/BlogCard.vue";
import { getAllBlogs } from "@/utils/api/blog";
const props = defineProps<{
  block: BlogSectionBlock;
}>();

const currentIndex = ref(0);
const windowWidth = ref(0);

const visiblePosts = computed(() => {
  if (windowWidth.value < 768) return 1;
  if (windowWidth.value < 1024) return 2;
  return 3;
});
const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(() => {
  updateWindowWidth();
  window.addEventListener("resize", updateWindowWidth);
});

const scrollNext = () => {
  console.log("next ubtton clicked")
  if (currentIndex.value < allPosts.length - visiblePosts.value) {
    currentIndex.value++;
  }
};

const scrollPrev = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
};

// Set section title and view-all link manually
const sectionTitle = "Latest from Our Blogs";
const viewAllLink = {
  url: "/blog",
  text: "View all posts",
};
const allPosts = await getAllBlogs();
</script>
