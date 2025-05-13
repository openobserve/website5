<script setup lang="ts">
import type { Blog } from "@/types/blog";
import { generateAuthorLink } from "@/utils/redirection";
import CustomBlurImage from "../core/CustomBlurImage.vue";
import { getInitials } from "@/utils/getInitials";
import { getAuthorDetails } from "@/utils/api/blog";
import { computed } from "vue";
const props = defineProps<{
  blog: Blog;
  type: string;
  authors: any[];
}>();
const effectiveAuthors = computed(() =>
  props.authors?.length ? props.authors : props.blog.authors
);
const getImageUrl = ({ image }: Blog) =>
  image?.formats?.medium?.url ??
  image?.formats?.large?.url ??
  image?.formats?.small?.url ??
  image?.url ??
  "";
</script>

<template>
  <a :key="blog.slug" :href="`/${type}/${blog.slug}`" class="group">
    <div
      class="rounded-lg overflow-hidden border border-border hover:border-primary-purple transition-colors flex flex-col h-full"
    >
      <div class="relative h-48 overflow-hidden">
        <CustomBlurImage :image="getImageUrl(blog)" :altText="blog.title" />
        <!-- <img
              :src="getImageUrl(blog)"
              :alt="blog.title"
              class="object-cover transition-transform group-hover:scale-105 w-full h-full absolute inset-0"
              />  -->
        <div class="absolute top-3 left-3">
          <div
            class="bg-primary-purple text-white border-none rounded-full px-3 py-1 text-xs"
          >
            Openobserve
          </div>
        </div>
      </div>
      <div class="p-6 flex flex-col justify-start md:items-start flex-grow">
        <div class="min-h-0 flex gap-2 mb-2">
          <a
            v-for="tag in blog?.categories?.slice(0, 2)"
            :key="tag.slug"
            :href="`/blog/tag/${tag.slug}`"
            class="bg-light-gray text-primary-gray text-sm font-medium rounded-full px-3 py-1 capitalize"
          >
            {{ tag.name }}
          </a>
        </div>
        <h3 class="text-lg font-semibold flex-grow mb-2">
          {{ blog?.title }}
        </h3>
        <p class="text-primary-gray mb-3 text-base line-clamp-3">
          {{ blog?.description }}
        </p>
        <div class="w-full h-px bg-gray-200 my-3"></div>
        <div class="flex items-center flex-wrap gap-2 mt-auto w-full">
          <!-- Avatars -->
          <div class="flex -space-x-3" v-if="blog?.authors?.length">
            <div
              v-for="it in blog.authors"
              :key="it.name"
              class="relative rounded-full border-2 border-white/80"
            >
              <div
                class="h-10 w-10 rounded-full overflow-hidden bg-purple-700 flex items-center justify-center text-white text-sm font-semibold"
              >
                <img
                  v-if="it?.image?.url"
                  :src="it.image.url"
                  :alt="it.name"
                  class="h-full w-full object-cover"
                />
                <span v-else>{{ getInitials(it.name) }}</span>
              </div>
            </div>
          </div>

          <!-- Author Names -->
          <div class="flex flex-col">
            <address class="not-italic text-black flex flex-wrap items-center">
              <template
                v-for="(it, index) in blog.authors"
                :key="`name-${it.name}`"
              >
                <span class="font-medium">{{ it.name }}</span>
                <span
                  v-if="index < blog.authors.length - 1"
                  class="text-black text-xs"
                  >,</span
                >
              </template>
            </address>
            <span v-if="blog?.publishDate" class="text-sm text-primary-gray">{{
              blog?.publishDate
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </a>
</template>
