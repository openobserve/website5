<!-- FaqTabs.vue -->
<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
    <button v-for="tab in categories" :key="tab" @click="$emit('update:activeTab', tab)" :class="[
      'px-4 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer',
      tab === activeTab
        ? 'bg-white text-primary-purple shadow'
        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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