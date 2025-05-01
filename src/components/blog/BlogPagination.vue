<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
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

const currentPageRef = ref(props.currentPage); // current page
const totalPages = computed(() => Math.ceil(props.totalItems / props.itemsPerPage)); // total number of pages
const numberRange = computed(() => {
  let current = currentPageRef.value, // Current page
    last = totalPages.value > 1 ? totalPages.value : 1, // Last page
    delta = 1, // Pages around the current page
    left = Math.max(1, current - delta),
    right = Math.min(last, current + delta + 1),
    range = [],
    rangeWithDots = [],
    l;

  // Always include the first 4 pages
  for (let i = 1; i <= Math.min(4, last); i++) {
    range.push(i);
  }

  // Add pages near the current page
  for (let i = left; i < right; i++) {
    if (!range.includes(i)) {
      range.push(i);
    }
  }

  // Always include the last page
  if (!range.includes(last)) {
    range.push(last);
  }

  // Insert ellipses where necessary
  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push("...");
      }
    }
    rangeWithDots.push(i);
    l = i;
  }

  return rangeWithDots;
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
    class="w-10 h-10 flex items-center justify-center mx-1 border rounded-lg text-gray-700 hover:bg-gray-100 disabled:opacity-50"
    :class="{ 'pointer-events-none opacity-50': currentPage === 1 }"
    :href="generatePageNavLink(type, subType, identifier, currentPage - 1)"
  >
    <ChevronLeft class="w-4 h-4" />
  </a>

  <!-- Page Number Buttons -->
  <div class="flex items-center">
    <template v-for="(page, index) in numberRange" :key="index">
      <span v-if="page === '...'" class="px-3 text-gray-400">...</span>
      <a
        v-else
        :href="generatePageNavLink(type, subType, identifier, page)"
        class="w-10 h-10 flex items-center justify-center mx-1 rounded-lg border text-sm font-medium"
        :class="[
          page === currentPage
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
    class="w-10 h-10 flex items-center justify-center mx-1 border rounded-lg text-gray-700 hover:bg-gray-100 disabled:opacity-50"
    :class="{ 'pointer-events-none opacity-50': currentPage === totalPages }"
    :href="generatePageNavLink(type, subType, identifier, currentPage + 1)"
  >
    <ChevronRight class="w-4 h-4" />
  </a>
</section>

</template>