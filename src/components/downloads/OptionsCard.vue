<template>
    <div class="w-full">
      <div v-for="tab in tabs" :key="tab.value">
        <div v-if="activeTab === tab.value" class="grid gap-6 lg:grid-cols-1 lg:gap-12 items-center border rounded-lg p-4">
          <div class="space-y-4">
            <h3 class="text-2xl font-bold">{{ tab?.title }}</h3>
            <p class="text-gray-500" v-html="tab?.description"/>
              <!-- {{ tab?.description }}
            </p> -->
            <ul class="space-y-2">
              <li v-for="(feature, index) in tab?.features" :key="index" class="flex items-center gap-2">
                <Check class="h-5 w-5 text-primary-purple" />
                <span>{{ feature }}</span>
              </li>
            </ul>
            <p class="text-gray-500" v-if="tab?.additionalInfo">{{ tab?.additionalInfo }}</p>
            <button
              v-if="tab?.button.text"
              class="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white transition-colors w-full"
              :class="tab.button.class">
              {{ tab?.button.text }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { Check } from 'lucide-vue-next';
  
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
  </script>
  
  <style scoped>
  .text {
    color: white;
    /* Replace with your primary green color */
  }
  
  /* Ensure consistent aspect ratio for images */
  .aspect-w-1 {
    aspect-ratio: 1 / 1;
  }
  </style>