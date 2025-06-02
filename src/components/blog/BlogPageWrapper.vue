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
      :allBlogs="hasActiveFilters ? filteredBlogs : allBlogs"
      :type="type"
      :totalItems="filteredBlogs.length"
      :currentPage="currentPage"
      :blogsData="currentDisplayBlogs"
      :sub-type="subType"
      :identifier="identifier"
      :hasActiveFilters="hasActiveFilters"
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
const selectedTag = ref(props.subType === 'tag' ? props.identifier : '');

function onCategoryChange(category: string) {
  selectedCategory.value = category;
  selectedTag.value = ''; // Reset tag when category changes
}

function onTagChange(tag: string) {
  selectedTag.value = tag;
}

const hasActiveFilters = computed(() => {
  return selectedCategory.value !== 'ALL' || selectedTag.value !== '';
});

// Always filter from all blogs when filters are active
const filteredBlogs = computed(() => {
  let result = props.allBlogs || [];

  // Only filter by category if selectedCategory is not 'ALL' and at least one blog has a category
  if (
    selectedCategory.value &&
    selectedCategory.value !== 'ALL' &&
    result.some(blog => blog.category)
  ) {
    result = result.filter(blog =>
      blog.category === selectedCategory.value ||
      (blog.category && blog.category.name === selectedCategory.value)
    );
  }

  if (selectedTag.value) {
    const activeTags = selectedTag.value.split(',').filter(t => t);
    if (activeTags.length > 0) {
      result = result.filter(blog =>
        blog.tags && blog.tags.some((t: any) => activeTags.includes(t.slug))
      );
    }
  }

  return result;
});

// Determine which blogs to display
const currentDisplayBlogs = computed(() => {
  // Always show filtered results if filters are active
  if (hasActiveFilters.value) {
    return filteredBlogs.value;
  }
  
  // If no filters, show paginated results from props.blogsData
  return props.blogsData || [];
});

</script>
