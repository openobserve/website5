<template>
  <section class="w-full flex flex-col justify-start">
    <!-- <div class="py-3 md:py-6">
  <section class="container mx-auto px-4 md:px-6 lg:px-8 xl:px-11 w-full flex flex-col justify-start">
    <!-- <div class="py-3 md:py-6">
      <CustomSuggestions :suggestions="suggestionData" @selectSuggestion="selectSuggestion" :type="type" />
      <div class="w-full md:w-3/5 justify-center md:justify-end mt-4 md:mt-0">
        <div class="bg-black border border-gray-500 rounded-md p-2">
            <button class="flex items-center justify-center">
              <img src="/filter.svg" alt="Filter Icon" class="w-6 h-6" />
            </button>
          </div>
      </div>
    </div>
    <div class="search-container relative w-full px-4 pb-5">
      <div
        class="flex flex-row w-full space-x-2 justify-between items-center text-white border border-gray-50/10 h-10 rounded-lg px-2 focus-within:border-sky-500 bg-gray-700">
        <span class="text-white px-4">
          <img src="/search.svg" alt="" class="w-6 h-6"/>
        </span>
        <input v-model="searchItem" type="text"
          class="w-full bg-transparent focus:outline-none text-white text-sm placeholder-neutral-400"
        @input="handleSearch"
          placeholder="Search for a blog..." />
      </div>
      <div class="mt-2 ml-3 text-white text-sm">
        <template v-if="searchItem.trim()">
          <p v-show="filteredBlogsData.length > 0">
            Search results for "<span class="font-bold">{{ searchItem }}</span>"
          </p>
          <p v-show="filteredBlogsData.length === 0">
            No results for "<span class="font-bold">{{ searchItem }}</span>"
          </p>
        </template>
      </div>


    </div> -->
    <!-- <div class="block md:hidden">
      <BlogsListingMobileWrapper :sectionData="filteredBlogsData" titleTextColor="text-white"
        descriptionTextColor="text-gray-400" cardBgColor="bg-[#2A2A2A]" linkColor="text-[#00A3FF]" :type="type" />
    </div> -->
    <div>
      <BlogListing :sectionData="filteredBlogsData" titleTextColor="text-white" descriptionTextColor="text-gray-400"
        cardBgColor="bg-[#2A2A2A]" linkColor="text-[#00A3FF]" :type="type" />
    </div>

    <!-- <template v-if="totalItems !== undefined"   >
      <BlogPagination  v-show="!searchItem.trim()" :totalItems="totalItems" :itemsPerPage="itemsPerPage" :currentPage="currentPage" client:load
        :type="type" />
    </template> -->
  </section>
</template>

<script setup>
import CustomSuggestions from "./CustomSuggestionsWrapper.vue";
import BlogListing from "../blogs/BlogListing.vue";
import BlogPagination from "../blogs/BlogPagination.vue";

const props = defineProps({
  blogsData: { type: Array, required: true },
});

// const searchQuery = ref(""); // category click event
// const allBlogsData = ref([]);
// const searchItem = ref(""); // type in the search box
// const filteredBlogsData = computed(() => {
//   console.log(searchItem,"Search Item");
//   if (!searchItem.value.trim()) {
//     return props.blogsData;
//   }

//   const query = searchItem.value.toLowerCase().trim();
//   return props.allBlogData.filter(blog => {
//     // Match with blog title as per your requirement
//     return blog.title?.toLowerCase().includes(query);
//   });
// });


// const handleClickOutside = (event) => {
//   if (!event.target.closest(".search-container")) {
//     // Don't clear search query when clicking outside
//   }
// };

// onMounted(async () => {
//   document.addEventListener("click", handleClickOutside);
//   // Initialize with blogsData prop
//   if (props.blogsData && props.blogsData.length > 0) {
//     allBlogsData.value = props.blogsData;
//   }
// });

// onUnmounted(() => {
//   document.removeEventListener("click", handleClickOutside);
//   clearTimeout(searchTimeout);
// });
</script>