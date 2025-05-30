<template>
  <div>
    <BlogCategoryListing
      :categories="categories"
      :allTags="allTags"
      :type="type"
      @update:activeCategory="onCategoryChange"
    />
    <BlogListingWrapper
      :searchBar="true"
      :allBlogs="filteredAllBlogs"
      :type="type"
      :totalItems="filteredAllBlogs?.length"
      :currentPage="currentPage"
      :blogsData="paginatedBlogs"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import BlogCategoryListing from '@/components/blog/BlogCategoryListing.vue';
import BlogListingWrapper from '@/components/blog/BlogListingWrapper.vue';

const props = defineProps<{
  categories: Array<{ name: string; tags: Array<{ name: string; slug: string }> }>;
  allTags: Array<{ name: string; slug: string }>;
  type: 'blog' | 'articles';
  allBlogs: any[];
  blogsData: any[];
  currentPage: number;
}>();

const selectedCategory = ref('ALL');

function onCategoryChange(category: string) {
  selectedCategory.value = category;
}

function filterBlogsByCategory(blogs: any[], category: string) {
  if (!Array.isArray(blogs)) {
    return [];
  }
  if (category === 'ALL') {
    return blogs;
  }
  const filtered = blogs.filter(blog =>
    blog.category === category || (blog.category && blog.category.name === category)
  );
  return filtered;
}

const ITEMS_PER_PAGE =  props.allBlogs && props.allBlogs.length > 0 ? 10 : 0;

const filteredAllBlogs = computed(() => {
  return filterBlogsByCategory(props.allBlogs, selectedCategory.value);
});

const paginatedBlogs = computed(() => {
  const start = (props.currentPage - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  return filteredAllBlogs.value.slice(start, end);
});
</script>
