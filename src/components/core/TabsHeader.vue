<template>
  <div class="flex justify-center w-full mb-8 ">
    <div :class="gridClass">
      <button v-for="tab in tabs" :key="tab.title" :id="tab.title" @click="$emit('update:activeTab', tab.title)"
        class="w-full px-4 font-semibold rounded-md transition-colors cursor-pointer py-4" :class="{
          'bg-white border focus:outline-none text-primary-purple shadow-md': activeTab === tab.title,
          'bg-gray-100 focus:outline-none text-gray-700 hover:bg-gray-200': activeTab !== tab.title
        }">
        {{ tab.title }}
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
  },
  gridClass: {
    type: String,
    required: true
  }
})

defineEmits(['update:activeTab'])
</script>