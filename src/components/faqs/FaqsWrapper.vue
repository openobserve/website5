<!-- FaqsWrapper.vue -->
<template>
  <div class="max-w-4xl mx-auto px-4 py-12">
    <h2 class="text-3xl font-bold text-center mb-4">{{ title }}</h2>
    <p class="text-center text-gray-600 mb-8">{{ description }}</p>

    <FaqTabs :categories="categories" :activeTab="activeTab" @update:activeTab="activeTab = $event" />
    <FaqList :faqList="activeQuestions" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import FaqTabs from './FaqTabs.vue'
import FaqList from './FaqList.vue'

const props = defineProps({
  title: String,
  description: String,
  items: Array
})

const activeTab = ref(props.items[0].category.toLowerCase())

const categories = computed(() => {
  return props.items.map(item => item.category.toLowerCase())
})

const activeQuestions = computed(() => {
  const activeCategory = props.items.find(
    item => item.category.toLowerCase() === activeTab.value
  )
  return activeCategory ? activeCategory.questions : []
})
</script>