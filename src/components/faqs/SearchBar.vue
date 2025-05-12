<!-- SearchBar.vue -->
<template>
  <div class="mb-8">
    <div class="relative">
      <input v-model="searchQuery" type="text" placeholder="Search questions..." name="search" id="search"
        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-primary-purple outline-none transition-all"
        @input="handleSearch" />
      <span class="absolute right-3 top-3 text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const searchQuery = ref('')
const emit = defineEmits(['search'])

const handleSearch = () => {
  emit('search', searchQuery.value.trim().toLowerCase())
}
</script>