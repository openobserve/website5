<!-- FaqsWrapper.vue -->
<template>
  <div :class="background ? 'bg-gray-50' : ''">
    <CustomSection sectionClass="max-w-4xl">
      <!-- <HeadingSection :title="title" :description="description" align="CENTER" v-if="title || description" /> -->
      <!-- Add SearchBar component here -->
      <TabsHeader v-if="tabItems.length > 0" :tabs="tabItems" :activeTab="activeTab" @update:activeTab="updateActiveTab"
        gridClass="grid w-full max-w-3xl grid-cols-2 md:grid-cols-4 gap-2 mt-5" />
      <SearchBar @search="handleSearch" />

      <FaqList v-if="filteredfaqs.length > 0" :faqList="filteredfaqs"  :key="activeTab.title"  />
      <div v-else class="text-center text-gray-500">
        No faqs found for your search
      </div>
    </CustomSection>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import FaqList from './FaqList.vue'
import TabsHeader from '../core/TabsHeader.vue'
import HeadingSection from '../core/HeadingSection.vue'
import SearchBar from './SearchBar.vue'
import CustomSection from '../core/CustomSection.vue'
import { slugify } from '@/utils/slugify'

const props = defineProps({
  // title: {
  //   type: String,
  //   default: ''
  // },
  // description: {
  //   type: String,
  //   default: ''
  // },
  items: {
    type: Array,
    default: () => []
  },
  background: {
    type: Boolean,
    required: false
  }
})

const tabItems = computed(() => {
  return props.items.map(item => ({
    title: item.title,
    value: slugify(item.title)
  }))
})
const searchTerm = ref('')
const activeTab = ref(tabItems.value[0]?.title || '')

// Create tab items

// Update active tab and reset search
const updateActiveTab = (tabValue) => {
  activeTab.value = tabValue
  searchTerm.value = '' // Reset search when changing tabs
}

// Handle search
const handleSearch = (term) => {
  searchTerm.value = term
}

// Filter faqs based on active tab and search term
const filteredfaqs = computed(() => {
  if (!activeTab.value) return []

  // Get faqs for active category
  const activeCategory = props.items.find(
    item => slugify(item.title) === activeTab.value
  )
  let faqs = activeCategory?.faqs || []
  // Apply search filter if there's a search term
  if (searchTerm.value) {
    faqs = faqs.filter(q =>
      q.question.toLowerCase().includes(searchTerm.value) ||
      (q.answer && q.answer.toLowerCase().includes(searchTerm.value))
    )
  }

  return faqs
})
</script>