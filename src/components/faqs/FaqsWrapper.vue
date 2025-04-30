<!-- FaqsWrapper.vue -->
<template>
  <div class="max-w-4xl mx-auto px-4 py-12">
    <HeadingSection :title="title" :description="description" align="CENTER" />

    <TabsHeader v-if="tabItems.length > 0" :tabs="tabItems" :activeTab="activeTab"
      @update:activeTab="activeTab = $event" />
    <FaqList v-if="activeQuestions.length > 0" :faqList="activeQuestions" />
    <div v-else class="text-center text-gray-500">
      No questions available for this category
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import FaqList from './FaqList.vue'
import TabsHeader from '../core/TabsHeader.vue'
import HeadingSection from '../core/HeadingSection.vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Frequently Asked Questions'
  },
  description: {
    type: String,
    default: ''
  },
  items: {
    type: Array,
    default: () => []
  }
})

// Create tab items in the format TabsHeader expects
const tabItems = computed(() => {
  return props.items.map(item => ({
    label: item.label,
    value: item.id.toString() // Using ID as value for more reliable matching
  }))
})

// Initialize activeTab safely
const activeTab = ref(tabItems.value[0]?.value || '')

const activeQuestions = computed(() => {
  if (!activeTab.value) return []

  const activeCategory = props.items.find(
    item => item.id.toString() === activeTab.value
  )
  return activeCategory?.questions || []
})
</script>