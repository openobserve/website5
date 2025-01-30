<template>
  <CustomSection>
    <div class="search-container relative w-full">
      <div
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
      </div>

      <div class="flex py-6 items-center flex-col md:flex-row">
        <!-- Use the CustomSuggestions component -->
        <CustomSuggestions
          :suggestions="suggestions"
          @selectSuggestion="selectSuggestion"
        />

        <!-- Filter Icon -->
        <div
          class="w-full md:w-2/5 flex justify-center md:justify-end mt-4 md:mt-0"
        >
          <div class="bg-black border border-gray-500 rounded-md p-2">
            <button class="flex items-center justify-center">
              <img src="/filter.svg" alt="Filter Icon" class="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="py-10">
      <Heading :title="title" :description="description" align="CENTER" />
    </div>

    <div class="block md:hidden">
      <BlogsListingMobileWrapper
        :sectionData="items"
        titleTextColor="text-white"
        descriptionTextColor="text-gray-400"
        cardBgColor="bg-[#2A2A2A]"
        linkColor="text-[#00A3FF]"
      />
    </div>

    <div class="hidden md:block">
      <BlogListing
        :sectionData="paginatedItems"
        titleTextColor="text-white"
        descriptionTextColor="text-gray-400"
        cardBgColor="bg-[#2A2A2A]"
        linkColor="text-[#00A3FF]"
      />
    </div>
    <BlogPagination
      :totalItems="items.blogs.length"
      :itemsPerPage="itemsPerPage"
      @page-changed="handlePageChange"
    />

    <div class="flex justify-center py-10">
      <CustomButton
        variant="secondary"
        size="medium"
        buttonText="SEE ALL BLOGS"
      />
    </div>
  </CustomSection>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import CustomSection from "../core/CustomSection.vue";
import Heading from "../core/Heading.vue";
import CustomBlogs from "../../components/blogs/CustomBlogs.vue";
import CustomButton from "../core/CustomButton.vue";
import BlogsListingMobileWrapper from "../blogs/BlogsListingMobileView.vue";
import CustomSuggestions from "./CustomSuggestionsWrapper.vue";
import BlogPagination from "../blogs/BlogPagination.vue";
import BlogListing from "../blogs/BlogListing.vue";

const props = defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
  items: { type: Object, required: true },
});
const itemsPerPage = 5; // Set how many items to show per page
const currentPage = ref(1);
const paginatedItems = computed(() => {
  const data = Array.isArray(props.items)
    ? props.items.blogs
    : props.items.blogs; // Adjust this line
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return data.slice(start, end); // Using .slice() on the array
});
const handlePageChange = (page) => {
  currentPage.value = page;
};
const isOpenSearch = ref(false);
const searchQuery = ref("");

// Example suggestions
const suggestions = ref(["Vue.js", "Next.js", "React", "Nuxt", "Tailwind CSS"]);

const handleClickOutside = (event) => {
  if (!event.target.closest(".search-container")) {
    isOpenSearch.value = false;
  }
};

const selectSuggestion = (suggestion) => {
  searchQuery.value = suggestion;
  isOpenSearch.value = false;
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
