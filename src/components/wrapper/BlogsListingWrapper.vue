<template>
  <section
    class="container mx-auto px-4 md:px-6 lg:px-8 xl:px-11 w-full flex flex-col justify-start"
  >
    <div v-if="searchBar" class="search-container relative w-full px-4 pb-5">
      <div
        class="flex flex-row w-full space-x-2 justify-between items-center text-white border border-gray-50/10 h-10 rounded-lg px-2 focus-within:border-sky-500 bg-gray-700"
      >
        <span class="text-white px-4">
          <img src="/img/icon/search.svg" alt="Search Icon" />
        </span>
        <input
          v-model="searchItem"
          type="text"
          class="w-full bg-transparent focus:outline-none text-white text-sm placeholder-neutral-400"
          placeholder="Search for a Blog..."
        />
        <!-- @input="handleSearch" -->
      </div>
      <div class="mt-2 ml-3 text-white text-sm">
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
    </div>

    <!-- <div class="block md:hidden">
      <BlogsListingMobileWrapper :sectionData="filteredBlogsData" titleTextColor="text-white"
        descriptionTextColor="text-gray-400" cardBgColor="bg-[#2A2A2A]" linkColor="text-[#00A3FF]" :type="type" />
    </div> -->
    <div>
      <BlogListing
        :sectionData="filteredBlogsData"
        titleTextColor="text-white"
        descriptionTextColor="text-gray-400"
        cardBgColor="bg-[#2A2A2A]"
        linkColor="text-[#00A3FF]"
        :type="type"
      />
    </div>

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
  </section>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import BlogListing from "../blogs/BlogListing.vue";
import BlogPagination from "../blogs/BlogPagination.vue";
import { ITEMS_PER_PAGE } from "@/utils/api/constant";
import { handleBlogSearch } from "@/utils/searchBar";

const props = defineProps({
  blogsData: { type: Array, required: true },
  allBlogData: { type: Array, required: true },
  currentPage: { type: Number, required: false },
  totalItems: { type: Number, required: false },
  type: { type: String, required: true },
  subType: { type: String, required: false },
  identifier: { type: String, required: false },
  searchBar: { type: Boolean, required: false },
});
const searchItem = ref(""); // type in the search box
const filteredBlogsData = ref(props?.blogsData);
watch(searchItem, async (newValue) => {
  filteredBlogsData.value = await handleBlogSearch(
    newValue,
    props?.allBlogData,
    props?.blogsData
  );
});

console.log("filteredBlogsData", filteredBlogsData);

const shouldPaginate = computed(() => {
  return props?.totalItems > ITEMS_PER_PAGE;
});
</script>
