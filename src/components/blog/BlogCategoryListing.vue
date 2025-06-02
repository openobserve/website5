<template>
  <!-- Category Tabs -->
  <div class="border-b border-border mb-8" v-show="type === 'blog'">
    <div class="flex overflow-x-auto scrollbar-hide space-x-1 sm:space-x-2" >
      <button
        v-for="category in categoriesWithAll"
        :key="category.name"
        :class="[
          'px-4 py-3 text-sm lg:text-base font-medium whitespace-nowrap transition-colors cursor-pointer capitalize',
          activeCategory === category.name
            ? 'text-primary-purple border-b-2 border-primary-purple'
            : 'text-primary-gray hover:text-primary-purple',
        ]"
        @click="setActiveCategory(category.name)"
      >
        {{ category.name }}
      </button>
    </div>
  </div>

  <!-- Search and filter section -->
  <div class="mb-8 space-y-6">
    <div class="flex flex-wrap items-center gap-3">
      <div class="flex gap-2 items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary-gray">
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
        </svg>
        <span class="text-sm text-primary-gray">Filter by:</span>
      </div>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="tag in showTagsBasedOnType"
          :key="tag.name"
          class="px-3 py-1 border border-gray-300 rounded-full font-semibold text-sm cursor-pointer hover:bg-primary-purple hover:text-white transition-colors capitalize"
          @click="toggleTag(tag.slug)"
          :class="selectedTags.includes(tag.slug) ? 'bg-primary-purple text-white' : ''"
        >
          {{ tag.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";

const props = defineProps<{
  categories: {
    name: string;
    tags: {
      name: string;
      slug: string;
    }[];
  }[];
  allTags: {
    name: string;
    slug: string;
  }[];
  type: "blog" | "articles";
  selectedTag: string;
}>();

const activeCategory = ref("ALL");
const selectedTags = ref<string[]>([]);

// Initialize selectedTags with selectedTag if provided
watch(() => props.selectedTag, (newTag) => {
  if (newTag) {
    selectedTags.value = newTag.split(',').filter(t => t);
  } else {
    selectedTags.value = [];
  }
}, { immediate: true });

const categoriesWithAll = computed(() => [
  { name: "ALL" },
  ...(props.categories || []),
]);

function setActiveCategory(category: string) {
  activeCategory.value = category;
  selectedTags.value = [];
  emit('update:activeCategory', category);
  emit('update:activeTag', '');
}

function toggleTag(tag: string) {
  const index = selectedTags.value.indexOf(tag);
  if (index === -1) {
    selectedTags.value.push(tag);
  } else {
    selectedTags.value.splice(index, 1);
  }
  emit('update:activeTag', selectedTags.value.join(','));
}

const emit = defineEmits(['update:activeCategory', 'update:activeTag']);

const filtersubTagsBasedonSuperiorTag = computed(() => {
  if (activeCategory.value === "ALL") {
    return props.allTags || [];
  }

  const matchedCategory = props.categories?.find(
    (category) => category.name === activeCategory.value
  );

  return matchedCategory?.tags || [];
});

const showTagsBasedOnType = computed(() => {
  if (props.type === "articles") {
    return props.allTags || [];
  }
  return filtersubTagsBasedonSuperiorTag.value || [];
});
</script>
