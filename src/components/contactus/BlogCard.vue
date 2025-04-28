<template>
  <div class="bg-black border border-gray-800 rounded-lg overflow-hidden flex flex-col h-full">
    <div class="aspect-[16/9] overflow-hidden">
      <img :src="post.image" :alt="post.title" class="w-full h-full object-cover" />
    </div>
    <div class="p-5 flex flex-col flex-grow">
      <div class="text-xs text-gray-400 mb-2">
        {{ post.date }} • {{ post.author }}
      </div>
      <h3 class="text-lg font-semibold text-white mb-2">{{ post.title }}</h3>
      <p v-if="post.excerpt" class="text-gray-400 text-sm mb-4 flex-grow">
        {{ post.excerpt }}
      </p>
      <a
        :href="post.readMoreLink"
        class="text-indigo-400 hover:text-indigo-300 text-sm font-medium inline-flex items-center group mt-auto"
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
defineProps<{
  post: {
    id: string;
    title: string;
    date: string;
    author: string;
    excerpt?: string;
    image: string;
    readMoreLink: string;
  };
}>();
</script>