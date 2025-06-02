<template>
  <div class="flex flex-col space-y-4">
    <!-- Full-width search bar -->
    <div class="relative w-full" v-show="searchBar">
      <div class="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-gray h-5 w-5">
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
          Search results for "<span class="font-bold">{{ searchItem }}</span>"
        </p>
        <p v-show="displayedBlogs.length === 0">
          No results for "<span class="font-bold">{{ searchItem }}</span>"
        </p>
      </template>
    </div>
    <BlogListing :sectionData="displayedBlogs" :type="type" />
    <template v-if="shouldShowPagination">
      <BlogPagination
        :totalItems="totalItems"
        :itemsPerPage="ITEMS_PER_PAGE"
        :currentPage="currentPage"
        :type="type"
        :subType="subType"
        :identifier="identifier"
        client:load
      />
    </template>
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
    default: false
  }
});

const searchItem = ref("");
const searchResults = ref<Blog[]>([]);

watch(searchItem, async (newValue) => {
  if (newValue.trim()) {
    // Search in either filtered blogs or all blogs depending on if filters are active
    const sourceBlogs = props.hasActiveFilters ? props.blogsData : props.allBlogs;
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
    return searchResults.value;
  }
  return props.blogsData;
});

const shouldShowPagination = computed(() => {
  // Hide pagination if search is active or any other filter is active
  return props.totalItems > ITEMS_PER_PAGE && 
         !searchItem.value.trim() && 
         !props.hasActiveFilters;
});
</script>
