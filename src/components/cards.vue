  <script setup>
  import { ChevronDown } from 'lucide-vue-next'
  
  defineProps({
    icon: String,
    title: String,
    description: String,
    link: String,
    color: String,
    bg: String
  })
  </script>
  
<template>
    <div class="bg-light-gray rounded-xl border p-6 shadow-xs">
      <div class="mb-4 flex h-10 w-10 items-center justify-center rounded-full" :class="bg">
        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" :class="color" v-html="icon" />
      </div>
      <h3 class="mb-2 text-xl font-bold text-primary-black">{{ title }}</h3>
      <p class="text-primary-gray">{{ description }}</p>
      <div class="mt-4">
        <a
          :href="link"
          class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-white h-8 px-3 py-2"
          :class="[color.replace('text-', 'bg-'), color.replace('text-', 'hover:bg-') + '/90']"
        >
          Prove it
          <ChevronDown class="ml-2 h-3 w-3" />
        </a>
      </div>
    </div>
  </template>
  
  