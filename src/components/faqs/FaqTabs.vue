<!-- FaqTabs.vue -->
<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
    <button v-for="tab in categories" :key="tab" @click="$emit('update:activeTab', tab)" :class="[
      'text-sm md:text-base py-3 px-4 rounded-lg border transition-colors',
      tab === activeTab
        ? 'bg-primary-purple text-white border-primary-purple shadow-md'
        : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-50'
    ]">
      {{ tab.charAt(0).toUpperCase() + tab.slice(1) }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  activeTab: String,
  categories: Array
})

defineEmits(['update:activeTab'])
</script>