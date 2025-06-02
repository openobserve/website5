<template>
<section class="container mx-auto flex justify-center mt-8 py-4">
  <!-- Previous Button -->
  <a
    class="w-10 h-10 flex items-center justify-center mx-1 border rounded-lg text-gray-700 hover:bg-gray-100"
    :class="{ 'pointer-events-none opacity-50': currentPage <= 1 }"
    :href="generatePageNavLink(type, subType, identifier, currentPage - 1)"
  >
    <span class="sr-only">Previous</span>
    <ChevronLeft class="w-4 h-4" />
  </a>

  <!-- Page Number Buttons -->
  <div class="flex items-center">
    <template v-for="(page, index) in visiblePages" :key="index">
      <span v-if="page === '...'" class="px-3 text-gray-400">...</span>
      <a
        v-else
        :href="generatePageNavLink(type, subType, identifier, page)"
        class="w-10 h-10 flex items-center justify-center mx-1 border rounded-lg"
        :class=" [
          currentPage === page
            ? 'bg-primary-purple text-white'
            : 'text-gray-700 hover:bg-gray-100',
        ]"
      >
        {{ page }}
      </a>
    </template>
  </div>

  <!-- Next Button -->
  <a
    class="w-10 h-10 flex items-center justify-center mx-1 border rounded-lg text-gray-700 hover:bg-gray-100"
    :class="{ 'pointer-events-none opacity-50': currentPage >= totalPages }"
    :href="generatePageNavLink(type, subType, identifier, currentPage + 1)"
  >
    <span class="sr-only">Next</span>
    <ChevronRight class="w-4 h-4" />
  </a>
</section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { generatePageNavLink } from "@/utils/redirection";
import { ChevronLeft, ChevronRight } from "lucide-vue-next";

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
  },
  subType: {
    type: String,
    required: false,
  },
  identifier: {
    type: String,
    required: false,
  },
});

const totalPages = computed(() => Math.max(1, Math.ceil(props.totalItems / props.itemsPerPage)));

const visiblePages = computed(() => {
  const delta = 2; // Number of pages to show on either side of current page
  let range = [];
  let rangeWithDots = [];
  let l;

  // Calculate the range based on current page and total pages
  if (totalPages.value <= 7) {
    // If 7 or fewer pages, show all
    range = Array.from({ length: totalPages.value }, (_, i) => i + 1);
  } else {
    // Always include first page
    range.push(1);

    // Calculate the start and end of the range around current page
    let start = Math.max(2, props.currentPage - delta);
    let end = Math.min(totalPages.value - 1, props.currentPage + delta);

    // Adjust start if near the beginning
    if (props.currentPage - delta <= 2) {
      start = 2;
      end = Math.min(1 + delta * 2 + 1, totalPages.value - 1);
    }

    // Adjust end if near the end
    if (props.currentPage + delta >= totalPages.value - 1) {
      start = Math.max(totalPages.value - (delta * 2 + 1), 2);
      end = totalPages.value - 1;
    }

    // Add the range
    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    // Always include last page
    if (totalPages.value > 1) {
      range.push(totalPages.value);
    }
  }

  // Add dots where needed
  for (const i of range) {
    if (l) {
      if (i - l > 1) {
        rangeWithDots.push('...');
      }
    }
    rangeWithDots.push(i);
    l = i;
  }

  return rangeWithDots;
});
</script>