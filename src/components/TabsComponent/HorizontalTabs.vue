<template>
  <div class="mt-6">
    <div v-for="tab in tabs" :key="tab.value">
      <div v-if="activeTab === tab.value" class="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
        <div class="space-y-4">
          <span class="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium" :class="tab.badge.class">
            {{ tab.badge.text }}
          </span>
          <h3 class="text-2xl font-bold">{{ tab.title }}</h3>
          <p class="text-gray-500">
            {{ tab.description }}
          </p>
          <ul class="space-y-2">
            <li v-for="(feature, index) in tab.features" :key="index" class="flex items-center gap-2">
              <CheckCircle class="h-5 w-5 text-primary-green" />
              <span>{{ feature }}</span>
            </li>
          </ul>
          <button
            class="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white transition-colors"
            :class="tab.button.class">
            {{ tab.button.text }}
          </button>
        </div>
        <div class="flex justify-center">
          <div class="relative h-[300px] w-full max-w-[500px]">
            <img :src="tab.image?.url" :alt="tab.imageAlt" class="object-contain rounded-lg shadow-lg w-full h-full" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { CheckCircle } from 'lucide-vue-next'

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