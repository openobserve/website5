<!-- FaqsWrapper.vue -->
<template>
  <div :class="background ? 'bg-gray-50' : ''">
    <CustomSection sectionClass="max-w-4xl">
      <HeadingSection :title="title" :description="description" align="CENTER" v-if="title || description" />
      <!-- Add SearchBar component here -->
      <TabsHeader v-if="tabItems.length > 0" :tabs="tabItems" :activeTab="activeTab" @update:activeTab="updateActiveTab"
        gridClass="grid w-full max-w-3xl grid-cols-2 md:grid-cols-4 gap-2" />
      <SearchBar @search="handleSearch" />

      <FaqList v-if="filteredQuestions.length > 0" :faqList="filteredQuestions" />
      <div v-else class="text-center text-gray-500">
        No questions found for your search
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

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
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
    label: item.label,
    value: item.id.toString()
  }))
})
const searchTerm = ref('')
const activeTab = ref(tabItems.value[0]?.value || '')

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

// Filter questions based on active tab and search term
const filteredQuestions = computed(() => {
  if (!activeTab.value) return []

  // Get questions for active category
  const activeCategory = props.items.find(
    item => item.id.toString() === activeTab.value
  )
  let questions = activeCategory?.questions || []

  // Apply search filter if there's a search term
  if (searchTerm.value) {
    questions = questions.filter(q =>
      q.question.toLowerCase().includes(searchTerm.value) ||
      (q.answer && q.answer.toLowerCase().includes(searchTerm.value))
    )
  }

  return questions
})
</script>