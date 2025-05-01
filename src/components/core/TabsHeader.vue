<template>
  <div class="flex justify-center mb-8">
    <div class="grid w-full max-w-3xl grid-cols-2 md:grid-cols-4 gap-2">
      <button v-for="tab in tabs" :key="tab.value" @click="$emit('update:activeTab', tab.value)"
        class="px-4 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer" :class="{
          'bg-white text-primary-purple shadow': activeTab === tab.value,
          'bg-gray-100 text-gray-700 hover:bg-gray-200': activeTab !== tab.value
        }">
        {{ tab.label }}
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  tabs: {
    type: Array,
    required: true
  },
  activeTab: {
    type: String,
    required: true
  }
})

defineEmits(['update:activeTab'])
</script>