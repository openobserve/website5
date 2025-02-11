<script setup>
import { ref, computed, onMounted } from "vue";
import { generatePageNavLink } from "../../utils/redirection";

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
  type: {
    type: String,
    required: true,
  }
});
const currentPageRef = ref(props.currentPage);
const totalPages = computed(() =>
  Math.ceil(props.totalItems / props.itemsPerPage)
);
console.log(props)
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


// Update local state when prop changes
onMounted(() => {
  currentPageRef.value = props.currentPage;
});
</script>
<template>
  <section class="container mx-auto flex justify-center mt-8 py-4">
    <!-- Previous Button -->
    <a
      class="px-4 py-2 mx-2 border border-blue-400 text-blue-400 rounded-lg disabled:opacity-50 hover:bg-blue-50"
      :class="{ 'opacity-50 pointer-events-none': currentPage === 1 }"
     :href="generatePageNavLink(type, currentPage - 1)"
    >
      Previous
    </a>

    <!-- Page Number Buttons -->
    <div class="flex items-center">
      <a
        v-for="page in displayedPages"
        :key="page"
        :href="generatePageNavLink(type, page)"
        :class="[
          'px-4 py-2 mx-1 rounded-lg',
          page === currentPage
            ? 'bg-blue-400 text-white'
            : 'text-gray-500 hover:bg-blue-50',
        ]"
      >
        {{ page }}
    </a>
    </div>

    <!-- Next Button -->
    <a
      class="px-4 py-2 mx-2 border border-blue-400 text-blue-400 rounded-lg"
      :href="generatePageNavLink(type, currentPage + 1)"
      :class="{ 'opacity-50 pointer-events-none': currentPage === totalPages }"
    >
      Next
    </a>
  </section>
</template>


