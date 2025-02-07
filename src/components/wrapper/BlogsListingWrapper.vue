<template>
  <section
    class="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-11 w-full flex flex-col justify-start"
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
          <img src="/search.svg" alt="Search Icon" />
        </button>
      </div> -->

      <div class="py-6">
        <CustomSuggestions
          :suggestions="suggestionData"
          @selectSuggestion="selectSuggestion"
        />
        <div class="w-full md:w-3/5 justify-center md:justify-end mt-4 md:mt-0">
          <!-- <div class="bg-black border border-gray-500 rounded-md p-2">
            <button class="flex items-center justify-center">
              <img src="/filter.svg" alt="Filter Icon" class="w-6 h-6" />
            </button>
          </div> -->
        </div>
      </div>
    </div>

    <div class="py-10">
      <Heading :title="title" :description="description" align="CENTER" />
    </div>
    <div class="block md:hidden">
      <BlogsListingMobileWrapper
        :sectionData="blogsData"
        titleTextColor="text-white"
        descriptionTextColor="text-gray-400"
        cardBgColor="bg-[#2A2A2A]"
        linkColor="text-[#00A3FF]"
      />
    </div>

    <div class="hidden md:block">
      <BlogListing
        :sectionData="blogsData"
        titleTextColor="text-white"
        descriptionTextColor="text-gray-400"
        cardBgColor="bg-[#2A2A2A]"
        linkColor="text-[#00A3FF]"
      />
    </div>
    <BlogPagination
      :totalItems="totalItems"
      :itemsPerPage="itemsPerPage"
      :currentPage="currentPage"
      client:load
    />

    <!-- <div class="flex justify-center py-10">
      <CustomButton variant="secondary" size="medium" buttonText="SEE ALL BLOGS" />
    </div> -->
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import CustomSection from "../core/CustomSection.vue";
import Heading from "../core/Heading.vue";
import CustomButton from "../core/CustomButton.vue";
import BlogsListingMobileWrapper from "../blogs/BlogsListingMobileView.vue";
import CustomSuggestions from "./CustomSuggestionsWrapper.vue";
import BlogListing from "../blogs/BlogListing.vue";
import BlogPagination from "../blogs/BlogPagination.vue";
import { itemsPerPage } from "@/utils/cache";

const props = defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
  blogsData: { type: Array, required: true },
  currentPage: { type: Number, required: true },
  suggestionData: { type: Array, required: true },
  totalItems: { type: Number, required: true },
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
