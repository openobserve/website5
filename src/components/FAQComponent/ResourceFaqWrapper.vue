<script setup>
import { ref, watch } from "vue";
import FAQSection from "./FAQSection.vue";

const props = defineProps({
  faqs: {
    type: Array,
    required: true,
  },
  heading: {
    type: Object,
    required: false,
  },
});

const searchItem = ref(""); // type in the search box
const filteredFaqs = ref(props.faqs);

// Function to handle FAQ search
const handleFaqSearch = (searchTerm, originalFaqs) => {
  if (!searchTerm || searchTerm.trim() === "") {
    return originalFaqs;
  }

  const term = searchTerm.toLowerCase().trim();
  return originalFaqs.filter((faq) =>
    faq.question.toLowerCase().includes(term)
  );
};

watch(searchItem, (newValue) => {
  filteredFaqs.value = handleFaqSearch(newValue, props.faqs);
});

const handleClickOutside = (event) => {
  if (!event.target.closest(".search-container")) {
    // Don't clear search query when clicking outside
  }
};
</script>

<template>
  <div class="py-7 container mx-auto px-4 sm:px-6 lg:px-8 xl:px-11">
    <!-- Search Bar -->
    <div class="search-container relative w-full mb-4">
      <div
        class="flex flex-row w-full justify-between items-center border border-gray-600 h-12 rounded-xl px-4 bg-dark-glass shadow-lg backdrop-blur-lg"
      >
        <span class="opacity-70">
          <img src="/img/icon/search.svg" alt="Search Icon" class="w-4 h-4" />
        </span>
        <input
          v-model="searchItem"
          type="text"
          class="w-full bg-transparent focus:outline-none text-white text-sm placeholder-gray-400 ml-5"
          placeholder="Search here"
        />
      </div>
      <div class="mt-2 ml-3 text-white text-sm">
        <template v-if="searchItem.trim()">
          <p v-show="filteredFaqs.length > 0">
            Search results for "<span class="font-bold">{{ searchItem }}</span
            >"
          </p>
          <p v-show="filteredFaqs.length === 0">
            No results for "<span class="font-bold">{{ searchItem }}</span
            >"
          </p>
        </template>
      </div>
    </div>

    <!-- Glass Card Section for FAQs -->
    <section
      v-if="filteredFaqs.length > 0"
      class="relative glass-card w-full bg-opacity-80 backdrop-blur-lg shadow-lg px-4 flex flex-col justify-start"
    >
      <FAQSection :faqItems="filteredFaqs" />
    </section>
  </div>
</template>

<style scoped>
.glass-card {
  border-radius: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  background: linear-gradient(
    180deg,
    rgba(1, 1, 1, 0.48) 30%,
    rgba(1, 1, 1, 0.8) 100%
  );
}

.bg-dark-glass {
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0.6) 100%
  );
}
</style>
