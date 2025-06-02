<template>
  <div class="flex flex-col space-y-4">
    <!-- Full-width search bar -->
    <div class="relative w-full" v-show="searchBar">
      <div
        class="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-gray h-5 w-5"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>
      <input
        name="search"
        id="search"
        v-model="searchItem"
        type="text"
        :placeholder="type == 'blog' ? 'Search blogs...' : 'Search articles...'"
        class="pl-10 w-full border border-primary-gray/20 focus:ring-2 focus:ring-primary-purple focus:outline-none py-3 rounded-md text-base"
      />
    </div>
    <div class="mt-2 ml-3 text-black text-sm">
      <template v-if="searchItem.trim()">
        <p v-show="displayedBlogs.length > 0">
          Search results for "<span class="font-bold">{{ searchItem }}</span
          >"
        </p>
        <p v-show="displayedBlogs.length === 0">
          No results for "<span class="font-bold">{{ searchItem }}</span
          >"
        </p>
      </template>
    </div>
    <!-- Show centered "No result found" if not searching and no blogs -->
    <div
      v-if="!searchItem.trim() && displayedBlogs.length === 0"
      class="flex justify-center items-center min-h-[200px] text-lg text-gray-500"
    >
      No result found
    </div>
    <BlogListing v-else :sectionData="displayedBlogs" :type="type" />
    <div class="pagination-container" v-if="shouldShowPagination">
      <BlogPagination
        :totalItems="totalItems"
        :itemsPerPage="ITEMS_PER_PAGE"
        :currentPage="currentPage"
        :type="type"
        :subType="subType"
        :identifier="identifier"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Blog } from "@/types/blog";
import BlogListing from "@/components/blog/BlogListing.vue";
import { ITEMS_PER_PAGE } from "@/utils/api/constant";
import BlogPagination from "@/components/blog/BlogPagination.vue";
import { computed, ref, watch } from "vue";
import { handleBlogSearch } from "@/utils/handleBlogSearch";

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  allBlogs: {
    type: Array as () => Blog[],
    required: true,
  },
  totalItems: {
    type: Number,
    required: true,
  },
  blogsData: {
    type: Array as () => Blog[],
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
  subType: {
    type: String,
    required: false,
  },
  identifier: {
    type: String,
    required: false,
  },
  searchBar: {
    type: Boolean,
    required: false,
  },
  hasActiveFilters: {
    type: Boolean,
    required: false,
    default: false,
  },
  isSpecialPage: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const searchItem = ref("");
const searchResults = ref<Blog[]>([]);

const totalPages = computed(() =>
  Math.max(1, Math.ceil(props.totalItems / ITEMS_PER_PAGE))
);

const shouldShowPagination = computed(() => {
  // Always hide pagination when searching
  if (searchItem.value.trim()) {
    return false;
  }

  // Always hide pagination when filters are active
  if (props.hasActiveFilters) {
    return false;
  }

  // Show pagination if:
  // 1. We have a valid totalItems count
  // 2. We have more items than can fit on one page
  // 3. Either it's a special page (author/tag) OR we're on the main blog page
  const hasSufficientItems = props.totalItems > ITEMS_PER_PAGE;
  const isValidPage = props.totalItems > 0 && props.currentPage > 0;

  return hasSufficientItems && isValidPage;
});

watch(searchItem, async (newValue) => {
  if (newValue.trim()) {
    // For articles, always search in all blogs
    // For blogs, use displayed blogs only for special pages or active filters
    const sourceBlogs =
      props.type === "articles"
        ? props.allBlogs
        : props.hasActiveFilters || props.isSpecialPage
        ? props.blogsData
        : props.allBlogs;
    searchResults.value = await handleBlogSearch(
      newValue,
      sourceBlogs,
      sourceBlogs
    );
  } else {
    searchResults.value = [];
  }
});

const displayedBlogs = computed(() => {
  if (searchItem.value.trim()) {
    // Return search results
    return searchResults.value;
  }
  // Return the current blog set
  return props.blogsData;
});
</script>

<style scoped>
.pagination-container {
  margin-top: 2rem;
  margin-bottom: 2rem;
}
</style>
