<template>
  <section class="w-full bg-black text-white py-12 md:py-16">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center mb-8">
        <h2 class="text-2xl md:text-3xl font-bold">{{ block.title }}</h2>
        <div class="flex space-x-2">
          <button
            @click="scrollPrev"
            class="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
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
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            @click="scrollNext"
            class="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
            :disabled="currentIndex >= block.posts.length - visiblePosts"
            :class="{ 'opacity-50 cursor-not-allowed': currentIndex >= block.posts.length - visiblePosts }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div class="relative overflow-hidden">
        <div
          class="flex transition-transform duration-300 ease-in-out"
          :style="{ transform: `translateX(-${currentIndex * (100 / visiblePosts)}%)` }"
        >
          <div
            v-for="post in block.posts"
            :key="post.id"
            class="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 p-2"
          >
            <BlogCard :post="post" />
          </div>
        </div>
      </div>

      <div class="mt-8 text-center">
        <a
          :href="block.viewAllLink.url"
          class="text-indigo-400 hover:text-indigo-300 text-sm font-medium inline-flex items-center group"
        >
          {{ block.viewAllLink.text }}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 ml-1 transform transition-transform group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import type { BlogSectionBlock } from '@/types/Contactus';
import BlogCard from '@/components/contactus/BlogCard.vue';

const props = defineProps<{
  block: BlogSectionBlock;
}>();

const currentIndex = ref(0);
const windowWidth = ref(0);

const visiblePosts = computed(() => {
  if (windowWidth.value < 768) return 1; // Mobile: 1 post
  if (windowWidth.value < 1024) return 2; // Tablet: 2 posts
  return 3; // Desktop: 3 posts
});

const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(() => {
  updateWindowWidth();
  window.addEventListener('resize', updateWindowWidth);
});

const scrollNext = () => {
  if (currentIndex.value < props.block.posts.length - visiblePosts.value) {
    currentIndex.value++;
  }
};

const scrollPrev = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
};
</script>