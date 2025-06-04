<template>
  <div class="border rounded-lg overflow-hidden flex flex-col h-full">
    <div class="aspect-[16/9] overflow-hidden">
      <img :src="post.image.url" :alt="post.title" class="w-full h-full object-contain" />
    </div>
    <div class="p-5 flex flex-col h-full flex-1">
      <div class="text-xs text-gray-600 mb-2">
        {{ post.publishDate }} • {{ post.authors[0].name }}
      </div>
      <h3 class="text-lg font-semibold mb-2">{{ post.title }}</h3>
      <p class="text-gray-600 text-sm mb-4 line-clamp-3">
        {{ post.description }}
      </p>
      <a
        :href="`/blog/${post.slug}/`"
        class="text-indigo-400 hover:text-indigo-300 text-sm mt-auto inline-flex items-center font-medium group"
      >
        Read more
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
</template>

<script setup lang="ts">
const props = defineProps<{
  post: {
    id: string;
    title: string;
    publishDate: string;
    authors: Array<{ name: string }>;
    description: string;
    image: {
      url: string;
    };
    slug: string;
  };
}>();
</script>