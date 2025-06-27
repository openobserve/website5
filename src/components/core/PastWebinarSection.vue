<script setup>
import PastWebinarCard from "@/components/core/PastWebinarCard.vue";
import { ref, computed } from 'vue';

const props = defineProps({
  pastWebinars: {
    type: Array,
    required: true
  },
  heading: {
    type: Object,
    default: "Past Webinars"
  },
  sourceKey: {
    type: String,
    required: true
  }
});

const activeFilter = ref('all'); // 'all', 'video', 'webinar'
const searchItem = ref('');

// Computed property to filter content
const filteredWebinars = computed(() => {
  return props.pastWebinars.filter(webinar => {
    // First apply type filter
    const typeMatch = activeFilter.value === 'all' ||
      webinar.type.toLowerCase() === activeFilter.value;

    // Then apply search filter if there's a search term
    if (searchItem.value) {
      const searchLower = searchItem.value.toLowerCase();
      return typeMatch && (
        webinar.title.toLowerCase().includes(searchLower) ||
        (webinar.description && webinar.description.toLowerCase().includes(searchLower))
      );
    }

    return typeMatch;
  });
});

const setFilter = (filter) => {
  activeFilter.value = filter;
};
</script>

<template>
  <section class="py-16 lg:py-20 bg-gray-50">
    <div class="container px-4 sm:px-6 lg:px-8 xl:px-11 mx-auto">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">{{ props?.heading?.title }} </h2>
        <p class="text-gray-600 text-lg">
          {{ props?.heading?.description }}
        </p>
      </div>

      <!-- Search and Filter Controls -->
      <div class="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <!-- Filter Buttons -->
        <div class="flex items-center space-x-2 w-full md:w-auto">
          <button @click="setFilter('all')" :class="{
            'bg-primary-purple text-white': activeFilter === 'all',
            'bg-white text-gray-700': activeFilter !== 'all'
          }"
            class="px-4 py-2 rounded-md border border-gray-200 hover:bg-primary-purple hover:text-white transition-colors cursor-pointer">
            All
          </button>
          <button @click="setFilter('videos')" :class="{
            'bg-primary-purple text-white': activeFilter === 'videos',
            'bg-white text-gray-700': activeFilter !== 'videos'
          }"
            class="px-4 py-2 rounded-md border border-gray-200 hover:bg-primary-purple hover:text-white transition-colors cursor-pointer">
            Videos
          </button>
          <button @click="setFilter('webinar')" :class="{
            'bg-primary-purple text-white': activeFilter === 'webinar',
            'bg-white text-gray-700': activeFilter !== 'webinar'
          }"
            class="px-4 py-2 rounded-md border border-gray-200 hover:bg-primary-purple hover:text-white transition-colors cursor-pointer">
            Webinars
          </button>
        </div>
      </div>

      <!-- Content Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <PastWebinarCard v-for="webinar in filteredWebinars" :key="webinar.id" :webinar="webinar"
          :sourceKey="webinar.type" />
      </div>

      <!-- Empty state -->
      <div v-if="filteredWebinars.length === 0" class="text-center py-12">
        <p class="text-gray-500">No items found matching your criteria.</p>
      </div>
    </div>
  </section>
</template>