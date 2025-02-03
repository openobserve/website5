<template>
  <section class="container mx-auto flex justify-center mt-8">
    <!-- Previous Button -->
    <button
      class="px-4 py-2 mx-2 border border-blue-400 text-blue-400 rounded-lg disabled:opacity-50 hover:bg-blue-50"
      :disabled="currentPage === 1"
      @click="changePage(currentPage - 1)"
    >
      Previous
    </button>

    <!-- Page Number Buttons -->
    <div class="flex items-center">
      <button
        v-for="page in displayedPages"
        :key="page"
        :class="[
          'px-4 py-2 mx-1 rounded-lg',
          page === currentPage
            ? 'bg-blue-400 text-white'
            : 'text-gray-500 hover:bg-blue-50'
        ]"
        @click="changePage(page)"
      >
        {{ page }}
      </button>
    </div>

    <!-- Next Button -->
    <button
      class="px-4 py-2 mx-2 border border-blue-400 text-blue-400 rounded-lg disabled:opacity-50 hover:bg-blue-50"
      :disabled="currentPage === totalPages"
      @click="changePage(currentPage + 1)"
    >
      Next
    </button>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const props = defineProps({
  totalItems: {
    type: Number,
    required: true,
  },
  itemsPerPage: {
    type: Number,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
    default: 1,
  },
});

const emit = defineEmits(["page-changed"]);
const currentPageRef = ref(props.currentPage);
const totalPages = computed(() => Math.ceil(props.totalItems / props.itemsPerPage));

// Compute the pages to display (show 5 pages at a time)
const displayedPages = computed(() => {
  const pages = [];
  let start = Math.max(1, currentPageRef.value - 2);
  let end = Math.min(totalPages.value, start + 4);
  
  // Adjust start if we're near the end
  if (end === totalPages.value) {
    start = Math.max(1, end - 4);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});

// Change page function
const changePage = async (newPage) => {
  if (newPage >= 1 && newPage <= totalPages.value) {
    currentPageRef.value = newPage;
    
    // Update URL
    const newUrl = newPage === 1 
      ? '/blog' 
      : `/blog/page/${newPage}`;
    console.log('newUrl', newUrl)
    window.location.assign(newUrl);
    
    // Emit event for parent component
    emit("page-changed", newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

// Update local state when prop changes
onMounted(() => {
  currentPageRef.value = props.currentPage;
});
</script>