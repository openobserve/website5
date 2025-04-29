<template>
  <header class="relative py-12 md:py-16 mb-6 overflow-hidden">
    <!-- Gradient background -->
    <div
      class="absolute inset-0 bg-gradient-to-r from-primary-purple to-primary-blue"
    ></div>
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-11 relative z-10">
      <div class="max-w-7xl mx-auto flex flex-col">
        <!-- Tags -->
        <div class="flex flex-wrap gap-2 mb-4">
          <a
            v-for="tag in tags"
            :key="tag.slug"
            :href="`/blog/tag/${tag.slug}`"
            class="px-3 py-1 rounded-full bg-white/20 text-white text-sm hover:bg-white/30 backdrop-blur-sm capitalize"
          >
            {{ tag.name }}
          </a>
        </div>

        <!-- Title -->
        <h1
          class="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-white"
        >
          {{ title }}
        </h1>

        <!-- Author info and social share -->
        <div
          class="flex flex-col sm:flex-row justify-between items-start sm:items-center"
        >
          <div class="flex flex-wrap items-center gap-4">
            <!-- Avatars Section -->
            <div class="flex -space-x-3">
              <div
                v-for="(it, index) in author"
                :key="it.name"
                class="relative rounded-full border-2 border-white/80"
              >
                <div
                  class="h-10 w-10 rounded-full overflow-hidden bg-purple-700 flex items-center justify-center text-white text-sm font-semibold"
                >
                  <img
                    v-if="it.image?.url"
                    :src="it.image.url"
                    :alt="it.name"
                    class="h-full w-full"
                  />
                  <span v-else>
                    {{ getInitials(it.name) }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Names Section -->
            <div class="flex flex-wrap items-center gap-0.5 text-white">
              <template v-for="(it, index) in author" :key="`name-${it.name}`">
                <span class="font-medium">{{ it.name }}</span>
                <span
                  v-if="index < author.length - 1"
                  class="text-white/70 text-xs"
                  >,</span
                >
              </template>
            </div>
          </div>

          <!-- Social Share Buttons -->
          <!-- <div class="flex gap-3 text-white">
            <a
              :href="`https://twitter.com/share?url=${shareUrl}&text=${post.title}`"
              target="_blank"
              rel="noopener"
              class="hover:opacity-80"
            >
              <Twitter class="h-5 w-5" />
            </a>
            <a
              :href="`https://www.linkedin.com/shareArticle?url=${shareUrl}&title=${post.title}`"
              target="_blank"
              rel="noopener"
              class="hover:opacity-80"
            >
              <Linkedin class="h-5 w-5" />
            </a>
            <a
              :href="`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`"
              target="_blank"
              rel="noopener"
              class="hover:opacity-80"
            >
              <Facebook class="h-5 w-5" />
            </a>
          </div> -->
        </div>
        <div class="flex flex-row space-x-4">
          <div class="flex items-center text-white text-base mt-4">
            <Calendar class="h-4 w-4 mr-1" />
            <span>{{ publishDate }}</span>
          </div>
          <div class="flex items-center text-white text-base mt-4">
            <Clock class="h-4 w-4 mr-1" />
            <span>{{ calculateReadingTime(content) }}</span>
          </div>
        </div>
      </div>
    </div>
  </header>
  <div class="container mx-auto px-4 mb-6">
    <div class="max-w-7xl mx-auto">
      <div class="relative aspect-[16/9] rounded-lg overflow-hidden shadow-xl">
        <img :src="blogImage" :alt="title" class="object-cover" priority />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { calculateReadingTime } from "@/utils/calculateReadingTime";
import { Calendar, Clock, Link } from "lucide-vue-next";

defineProps<{
  type: string;
  title: string;
  blogImage: string;
  tags: {
    name: string;
    slug: string;
  }[];
  author: {
    name: string;
    image: {
      url: string;
    };
    slug: string;
  }[];
  publishDate: string;
  content: string;
}>();

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
}
</script>
