<template>
  <div class="flex flex-col space-y-4 py-10">
    <!-- Full-width search bar -->
    <div class="relative w-full">
      <SearchIcon
        class="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-gray h-5 w-5"
      />
      <input
        v-model="searchItem"
        type="text"
        placeholder="Search articles..."
        class="pl-10 w-full border border-primary-gray/20 focus:ring-2 focus:ring-primary-purple focus:outline-none py-3 rounded-md text-base"
      />
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <CaseStudyCard
        v-for="(item, index) in filteredCaseStudiesData"
        :key="index"
        :item="item"
      />
    </div>
    <!-- <template v-if="shouldPaginate">
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
    </template> -->
  </div>
</template>
<script setup lang="ts">
import type { CaseStudies } from "@/types/case-studies";
import { handleBlogSearch } from "@/utils/handleBlogSearch";
import { SearchIcon } from "lucide-vue-next";
import { ref, watch } from "vue";
import CaseStudyCard from "./CaseStudyCard.vue";
const props = defineProps({
  caseStudies: {
    type: Array as () => CaseStudies[],
    required: true,
  },
  totalItems: {
    type: Number,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
  shouldPaginate: {
    type: Boolean,
    required: true,
  },
  searchBar: {
    type: Boolean,
    required: false,
  },
})

const searchItem = ref("");
const filteredCaseStudiesData = ref(props.caseStudies);
// watch(searchItem, async (newValue) => {
//   filteredBlogsData.value = await handleBlogSearch(
//     newValue,
//     props?.allBlogs,
//     props?.blogsData
//   );
// });

// const shouldPaginate = computed(() => {
//   return props?.totalItems > ITEMS_PER_PAGE;
// });
</script>