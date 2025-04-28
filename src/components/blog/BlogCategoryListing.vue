<template>
  <!-- Category Tabs -->
  <div class="border-b border-border mb-8">
    <div class="flex overflow-x-auto scrollbar-hide space-x-1 sm:space-x-2">
      <button
        v-for="category in categories"
        :key="category.name"
        :class="[
          'px-4 py-3 text-sm lg:text-base font-medium whitespace-nowrap transition-colors cursor-pointer capitalize',
          activeCategory === category.name
            ? 'text-primary-purple border-b-2 border-primary-purple'
            : 'text-primary-gray hover:text-primary-purple',
        ]"
      >
        <!-- @click="setActiveCategory(category)" -->
        {{ category.name }}
      </button>
    </div>
  </div>

  <!-- Search and filter section -->
  <div class="mb-8 space-y-6">
    <div class="flex flex-wrap items-center gap-3">
      <div class="flex gap-2 items-center">
        <FilterIcon class="text-primary-gray h-4 w-4" />
        <span class="text-sm text-primary-gray">Filter by:</span>
      </div>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="tag in allTags"
          :key="tag.name"
          class="px-3 py-1 border border-gray-300 rounded-full font-semibold text-sm cursor-pointer hover:bg-primary-purple hover:text-white transition-colors capitalize"
        >
          {{ tag.name }}
        </span>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { FilterIcon } from "lucide-vue-next";
import { ref } from "vue";

const props = defineProps<{
  categories: {
    name: string;
    slug: string;
  }[];
  allTags: {
    name: string;
    slug: string;
  }[];
  type: "blog" | "resources";
}>();

const activeCategory = ref(props?.categories?.[0]?.name || "");

function setActiveCategory(category: string) {
  activeCategory.value = category;
}
</script>
