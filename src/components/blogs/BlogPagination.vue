<template>
    <div class="flex justify-center mt-8">
      <!-- Previous Button -->
      <button
        class="px-4 py-2 mx-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
        :disabled="currentPage === 1"
        @click="changePage(currentPage - 1)"
      >
        Previous
      </button>
  
      <!-- Page Number Buttons -->
      <div class="flex items-center">
        <button
          v-for="page in pages"
          :key="page"
          :class="['px-4 py-2 mx-1', { 'bg-blue-500 text-white': page === currentPage, 'text-gray-500': page !== currentPage }]"
          @click="changePage(page)"
        >
          {{ page }}
        </button>
      </div>
  
      <!-- Next Button -->
      <button
        class="px-4 py-2 mx-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
        :disabled="currentPage === totalPages"
        @click="changePage(currentPage + 1)"
      >
        Next
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from "vue";
  
  // Pagination state
  const props = defineProps({
    totalItems: {
      type: Number,
      required: true,
    },
    itemsPerPage: {
      type: Number,
      required: true,
    },
  });
  
  const emit = defineEmits(["page-changed"]);
  const currentPage = ref(1);
  const totalPages = ref(Math.ceil(props.totalItems / props.itemsPerPage));
  
  // Computed property to generate page numbers
  const pages = computed(() => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages.value; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  });
  
  // Change page function
  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages.value) {
      currentPage.value = newPage;
      emit("page-changed", currentPage.value);
    }
  };
  </script>
  
  <style scoped>
  button {
    transition: background-color 0.2s ease;
  }
  button:hover {
    background-color: #1e40af;
  }
  </style>
  