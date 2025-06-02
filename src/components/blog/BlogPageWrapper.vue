<template>
  <div>    <BlogCategoryListing
      :categories="categories"
      :allTags="filteredTags"
      :type="type"
      @update:activeCategory="onCategoryChange"
      @update:activeTag="onTagChange"
      :selectedTag="selectedTag"
      :currentPageTag="currentTag"
    />
    <BlogListingWrapper
      :searchBar="true"
      :allBlogs="allBlogs"
      :type="type"
      :totalItems="displayTotalItems"
      :currentPage="currentPage"
      :blogsData="currentDisplayBlogs"
      :sub-type="subType"
      :identifier="identifier"
      :hasActiveFilters="hasActiveFilters"
      :isSpecialPage="isSpecialPage"
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
  totalItems: number;
}>();

const selectedCategory = ref('ALL');
const selectedTag = ref(''); // Always start with no tag selected

// Check if this is a special page (author or tag page)
const isSpecialPage = computed(() => props.subType === 'author' || props.subType === 'tag');

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

interface BlogTag {
  slug: string;
  name: string;
}

interface BlogAuthor {
  slug: string;
  name?: string;
}

interface Blog {
  authors?: BlogAuthor[];
  category?: { name: string } | string;
  tags?: BlogTag[];
  title?: string;
  slug?: string;
  date?: string;
}

// Helper function to get category name
function getCategoryName(category: string | { name: string } | undefined): string {
  if (!category) return '';
  if (typeof category === 'string') return category;
  return category.name;
}

// Filter blogs based on category and tags
const filteredBlogs = computed(() => {
  let result: Blog[] = [];
  // For author pages
  if (props.subType === 'author') {
    if (!hasActiveFilters.value) {
      // If no filters are active, use the paginated data      result = props.blogsData;
    } else {      // When filters are active, first get all author's blogs
      result = props.allBlogs.filter(blog => {        const isAuthorMatch = blog.authors?.some((author: BlogAuthor) => author.slug === props.identifier);
        return isAuthorMatch;
      });
      // Apply category filter if active
      if (selectedCategory.value !== 'ALL') {
        result = result.filter(blog => {
          const rawCategory = blog.category;
          const categoryName = getCategoryName(blog.category);
          return categoryName === selectedCategory.value;
        });

      }

      // Apply tag filter if active
      if (selectedTag.value) {
        const tags = selectedTag.value.split(',').filter(Boolean);
        if (tags.length > 0) {
          result = result.filter(blog => 
            blog.tags?.some((tag: BlogTag) => tags.includes(tag.slug))
          );

        }
      }
    }  } else if (props.subType === 'tag') {
    // For tag pages
    if (!hasActiveFilters.value) {
      // Use paginated and sorted data when no filters
      result = props.blogsData;
    } else {
      // First get all blogs with the current tag
      result = [...props.allBlogs]
        .filter(blog => blog.tags?.some((tag: BlogTag) => tag.slug === props.identifier))
        .sort((a, b) => {
          // Sort by date if available, fallback to title
          const dateA = new Date(a.date || '').getTime() || 0;
          const dateB = new Date(b.date || '').getTime() || 0;
          if (dateA === dateB) {
            return (a.title || '').localeCompare(b.title || '');
          }
          return dateB - dateA; // Latest first
        });
      
      if (selectedCategory.value !== 'ALL') {
        result = result.filter(blog => {
          return getCategoryName(blog.category) === selectedCategory.value;
        });
      }

      if (selectedTag.value) {
        const tags = selectedTag.value.split(',').filter(Boolean);
        if (tags.length > 0) {
          result = result.filter(blog => 
            blog.tags?.some((tag: BlogTag) => tags.includes(tag.slug))
          );
        }
      }
    }
  } else {
    // Keep existing blog page logic unchanged
    result = hasActiveFilters.value ? props.allBlogs : props.blogsData;

    if (selectedCategory.value !== 'ALL') {
      result = result.filter(blog => {
        return getCategoryName(blog.category) === selectedCategory.value;
      });
    }

    if (selectedTag.value) {
      const tags = selectedTag.value.split(',').filter(Boolean);
      if (tags.length > 0) {
        result = result.filter(blog => 
          blog.tags?.some((tag: BlogTag) => tags.includes(tag.slug))
        );
      }
    }
  }

  return result;
});

// Ensure we're passing the correct total items count
const displayTotalItems = computed(() => {
  if (hasActiveFilters.value) {
    // When filters are active, pass the filtered count
    return filteredBlogs.value.length;
  }
  
  // For special pages, use their specific total
  if (props.subType === 'author' || props.subType === 'tag') {
    return props.totalItems;
  }
  
  // For main blog page, use the total from props
  return props.totalItems;
});

// Determine which blogs to display
const currentDisplayBlogs = computed(() => {
  if (hasActiveFilters.value) {
    // When filters are active, show all filtered results
    return filteredBlogs.value;
  }
  
  // Otherwise use the paginated blogs from props
  return props.blogsData;
});

const currentTag = computed(() => {
  if (props.subType === 'tag' && props.identifier) {
    // Find the current tag details from allTags
    return props.allTags.find(t => t.slug === props.identifier);
  }
  return null;
});

// Filter out the current tag from allTags for tag pages
const filteredTags = computed(() => {
  if (props.subType === 'tag' && props.identifier) {
    // Remove the current tag from the list if it exists
    return props.allTags.filter(t => t.slug !== props.identifier);
  }
  return props.allTags;
});
</script>
