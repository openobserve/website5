<template>
  <div class="flex flex-col space-y-4">
    <!-- Full-width search bar -->
    <div class="relative w-full" v-show="searchBar">
      <SearchIcon
        class="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-gray h-5 w-5"
      />
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
        <p v-show="filteredBlogsData.length > 0">
          Search results for "<span class="font-bold">{{ searchItem }}</span
          >"
        </p>
        <p v-show="filteredBlogsData.length === 0">
          No results for "<span class="font-bold">{{ searchItem }}</span
          >"
        </p>
      </template>
    </div>
    <BlogListing :sectionData="filteredBlogsData" :type="type" />
    <template v-if="shouldPaginate">
      <BlogPagination
        v-show="!searchItem.trim()"
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
import { SearchIcon } from "lucide-vue-next";
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
});

const searchItem = ref(""); // type in the search box
const filteredBlogsData = ref(props?.blogsData);
watch(searchItem, async (newValue) => {
  filteredBlogsData.value = await handleBlogSearch(
    newValue,
    props?.allBlogs,
    props?.blogsData
  );
});


const shouldPaginate = computed(() => {
  return props?.totalItems > ITEMS_PER_PAGE;
});
</script>
