<template>
  <div class="flex flex-col space-y-4">
    <BlogListing :all-blogs="allBlogs" :type="type" :total-items="totalItems" :blogs-data="blogsData" :current-page="currentPage"/>
    <template v-if="shouldPaginate">
      <!-- v-show="!searchItem.trim()" -->
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
import type { Blog } from '@/types/blog';
import BlogListing from '@/components/blog/BlogListing.vue';
import { ITEMS_PER_PAGE } from '@/utils/api/constant';
import BlogPagination from '@/components/blog/BlogPagination.vue';
import { computed } from 'vue';
const  props = defineProps({
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

const shouldPaginate = computed(() => {
  return props?.totalItems > ITEMS_PER_PAGE;
});
</script>