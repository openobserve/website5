<script setup>
import CustomSection from "../core/CustomSection.vue";
import Heading from "../core/Heading.vue";
import CustomBlogs from "../../components/blogs/CustomBlogs.vue";
import CustomBlogsSwiper from "../blogs/CustomBlogsSwiper.vue";
import { ref, onMounted, onUnmounted } from "vue";
import CustomButton from "../core/CustomButton.vue";
import BlogsListingMobileWrapper from "./BlogsListingMobileWrapper.vue";

const props = defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
  items: { type: Object, required: true },
});

const isOpenSearch = ref(false);
const searchQuery = ref("");

// Example suggestions (replace with dynamic data if needed)
const suggestions = ref(["Vue.js", "Next.js", "React", "Nuxt", "Tailwind CSS", "Vue.js", "Next.js", "React", "Nuxt", "Tailwind CSS","Vue.js", "Next.js", "React", "Nuxt", "Tailwind CSS"]);


const handleClickOutside = (event) => {
  if (!event.target.closest(".search-container")) {
    isOpenSearch.value = false;
  }
};

// Function to set search query when a suggestion is clicked
const selectSuggestion = (suggestion) => {
  searchQuery.value = suggestion;
  isOpenSearch.value = false; // Optionally close search box after selection
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

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
          <!-- Suggestions -->
          <div class="flex flex-wrap gap-4 w-full md:w-3/5 justify-center md:justify-center">
            <button
              v-for="suggestion in suggestions"
              :key="suggestion"
              @click="selectSuggestion(suggestion)"
              class="px-6 py-1 bg-black border rounded-full hover:text-white text-sm text-neutral-400"
            >
              {{ suggestion }}
            </button>
          </div>
  
          <!-- Filter Icon - Adjusted for Mobile -->
          <div class="w-full md:w-2/5 flex justify-center md:justify-end mt-4 md:mt-0">
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
  
      <!-- Show slider component only on mobile (≤ 768px) -->
      <div class="block md:hidden">
        <BlogsListingMobileWrapper
          :sectionData="items"
          titleTextColor="text-white"
          descriptionTextColor="text-gray-400"
          cardBgColor="bg-[#2A2A2A]"
          linkColor="text-[#00A3FF]"
        />
      </div>
  
      <!-- Show normal component on larger screens (≥ 768px) -->
      <div class="hidden md:block">
        <CustomBlogs
          :sectionData="items"
          titleTextColor="text-white"
          descriptionTextColor="text-gray-400"
          cardBgColor="bg-[#2A2A2A]"
          linkColor="text-[#00A3FF]"
        />
      </div>
      <div class="flex justify-center py-10 ">
      <CustomButton
        variant="secondary"
        size="medium"
        buttonText="SEE ALL BLOGS"
          />
    </div>
    </CustomSection>
  </template>
  

<style scoped></style>
