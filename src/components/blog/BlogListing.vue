<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <a
      v-for="blog in allBlogs"
      :key="blog.slug"
      :href="`/blog/${blog.slug}`"
      class="group"
    >
      <div
        class="rounded-lg overflow-hidden border border-border hover:border-primary-purple transition-colors flex flex-col h-full"
      >
        <div class="relative h-48 overflow-hidden">
          <img
            :src="getImageUrl(blog)"
            :alt="blog.title"
            class="object-cover transition-transform group-hover:scale-105 w-full h-full absolute inset-0"
          />
        </div>
        <div class="p-2 flex flex-col flex-grow mt-2">
          <div class="flex flex-col md:flex-row justify-start md:items-start mb-2">
            <span v-if="blog?.authors" class="pr-1">
              <template v-for="(it, index) in blog.authors" :key="index">
                <a
                  v-if="it.slug"
                  :href="generateAuthorLink(type, it.slug)"
                  class="text-gray-600 hover:underline"
                >
                  {{ it.name }}
                </a>
                <span v-if="index < blog?.authors?.length - 1">, </span>
              </template>
            </span>
            <span class="hidden md:block text-gray-600" v-if="blog?.authors && blog?.publishDate">|</span>
            <span v-if="blog?.publishDate" class="px-1 text-gray-600">{{ blog?.publishDate }}</span>
          </div>
          <h2
            class="text-lg font-semibold mb-2"
          >
            {{ blog?.title }}
          </h2>
          <p class="text-primary-gray mb-4 flex-grow text-base line-clamp-3">{{ blog?.description }}</p>
          <!-- <div class="flex flex-wrap gap-2 mb-2">
            <a 
              v-for="tag in blog?.categories"
              :key="tag.slug"
              :href="`/blog/tag/${tag.slug}`"
              class="text-primary-purple text-sm font-medium bg-primary-purple/20 rounded-full px-3 py-1 capitalize"
            >
              {{ tag.name }}
            </a>
          </div> -->
        </div>
      </div>
    </a>
  </div>
</template>

<script setup lang="ts">
import type { Blog } from '@/types/blog';
import { generateAuthorLink } from '@/utils/redirection';

defineProps<{
  allBlogs: Blog[];
  type: string;
  totalItems: number;
  blogsData: Blog[];
  currentPage: number;
}>();

const getImageUrl = ({ image }: Blog) =>
  image?.formats?.medium?.url ??
  image?.formats?.large?.url ??
  image?.formats?.small?.url ??
  image?.url ??
  "";
</script>
