<template>
  <div>
    <BlogCategoryListing
      :categories="categories"
      :allTags="allTags"
      :type="type"
      @update:activeCategory="onCategoryChange"
      @update:activeTag="onTagChange"
      :selectedTag="selectedTag"
    />
    <BlogListingWrapper
      :searchBar="true"
      :allBlogs="filteredAllBlogs"
      :type="type"
      :totalItems="filteredAllBlogs?.length"
      :currentPage="currentPage"
      :blogsData="paginatedBlogs"
      :sub-type="subType"
      :identifier="identifier"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import BlogCategoryListing from '@/components/blog/BlogCategoryListing.vue';
import BlogListingWrapper from '@/components/blog/BlogListingWrapper.vue';
import { ITEMS_PER_PAGE } from '@/utils/api/constant';

const props = defineProps<{
  categories: Array<{ name: string; tags: Array<{ name: string; slug: string }> }>;
  allTags: Array<{ name: string; slug: string }>;
  type: 'blog' | 'articles';
  allBlogs: any[];
  blogsData: any[];
  currentPage: number;
  subType?: string;
  identifier?: string;
}>();

const selectedCategory = ref('ALL');
const highlightedTag = props.subType === 'tag' ? props.identifier : '';
const selectedTag = ref(highlightedTag);

function onCategoryChange(category: string) {
  selectedCategory.value = category;
  selectedTag.value = ''; // Reset tag when category changes
}

function onTagChange(tag: string) {
  selectedTag.value = tag;
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

// Filter blogs by tag (within the already category-filtered blogs)
function filterBlogsByTag(blogs: any[], tag: string) {
  if (!Array.isArray(blogs)) return [];
  if (!tag) return blogs;
  return blogs.filter(blog =>
    blog.tags && blog.tags.some((t: any) => t.slug === tag)
  );
}

// const ITEMS_PER_PAGE =  props.allBlogs && props.allBlogs.length > 0 ? 10 : 0;

// Final filtered blogs based on both category and tag
const filteredAllBlogs = computed(() => {
  const categoryFiltered = filterBlogsByCategory(props.allBlogs, selectedCategory.value);
  const tagFiltered = filterBlogsByTag(categoryFiltered, selectedTag.value);
  return tagFiltered;
});


// const paginatedBlogs = computed(() => {
//   const start = (props.currentPage - 1) * ITEMS_PER_PAGE;
//   console.log(start, "start");
//   const end = start + ITEMS_PER_PAGE;
//   console.log(end, "end");
//   console.log(filteredAllBlogs.value.slice(start, end), "filteredAllBlogs.value.slice(start, end)");
//   return filteredAllBlogs.value.slice(start, end);
// });
const totalPages = computed(() => {
  return Math.ceil(filteredAllBlogs.value.length / ITEMS_PER_PAGE) || 1;
});

const validCurrentPage = computed(() => {
  return Math.min(props.currentPage, totalPages.value);
});

const paginatedBlogs = computed(() => {
  const start = (validCurrentPage.value - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  return filteredAllBlogs.value.slice(start, end);
});
</script>
