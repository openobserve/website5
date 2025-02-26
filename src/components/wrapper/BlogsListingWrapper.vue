<template>
  <section
    class="container mx-auto px-4 md:px-6 lg:px-8 xl:px-11 w-full flex flex-col justify-start"
  >
    <div class="search-container relative w-full px-4">
      <!-- <div
        class="flex flex-row w-full space-x-2 justify-between items-center text-white border border-gray-50/10 h-10 rounded-lg px-2 focus-within:border-sky-500 bg-gray-700"
      >
        <input
          v-model="searchQuery"
          type="text"
          class="w-full bg-transparent focus:outline-none text-white text-sm placeholder-neutral-400"
          placeholder="Search here"
        />
        <button class="text-white px-4">
          <img src="/img/icon/search.svg" alt="Search Icon" />
        </button>
      </div> -->

      <div class="py-3 md:py-6">
        <CustomSuggestions
          :suggestions="suggestionData"
          @selectSuggestion="selectSuggestion"
          :type="type"
        />
        <div class="w-full md:w-3/5 justify-center md:justify-end mt-4 md:mt-0">
          <!-- <div class="bg-black border border-gray-500 rounded-md p-2">
            <button class="flex items-center justify-center">
              <img src="/img/icon/filter.svg" alt="Filter Icon" class="w-6 h-6" />
            </button>
          </div> -->
        </div>
      </div>
    </div>
    <div class="block md:hidden">
      <BlogsListingMobileWrapper
        :sectionData="blogsData"
        titleTextColor="text-white"
        descriptionTextColor="text-gray-400"
        cardBgColor="bg-[#2A2A2A]"
        linkColor="text-[#00A3FF]"
        :type="type"
      />
    </div>
    <div class="hidden md:block">
      <BlogListing
        :sectionData="blogsData"
        titleTextColor="text-white"
        descriptionTextColor="text-gray-400"
        cardBgColor="bg-[#2A2A2A]"
        linkColor="text-[#00A3FF]"
        :type="type"
      />
    </div>
    
    <template v-if="totalItems !== undefined">
      <BlogPagination
        :totalItems="totalItems"
        :itemsPerPage="itemsPerPage"
        :currentPage="currentPage"
        client:load
        :type="type"
      />
    </template>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import Heading from "../core/Heading.vue";
import BlogsListingMobileWrapper from "../blogs/BlogsListingMobileView.vue";
import CustomSuggestions from "./CustomSuggestionsWrapper.vue";
import BlogListing from "../blogs/BlogListing.vue";
import BlogPagination from "../blogs/BlogPagination.vue";
import { itemsPerPage } from "@/utils/api/blogs";

const props = defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
  blogsData: { type: Array, required: true },
  currentPage: { type: Number, required: true },
  suggestionData: { type: Array, required: true },
  totalItems: { type: Number, required: true },
  type: { type: String, required: true },
});
// console.log(props, "propss")
const searchQuery = ref("");

const selectSuggestion = (suggestion) => {
  searchQuery.value = suggestion;
};

const handleClickOutside = (event) => {
  if (!event.target.closest(".search-container")) {
    searchQuery.value = "";
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
