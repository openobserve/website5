<template>
  <section id="our-story" class="space-y-8 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
    <!-- Title with horizontal lines -->
    <FramedTitle :title="data.title" />
    <p class="text-center text-gray-600 text-lg">{{ data.description }}</p>
    <!-- Content grid -->
    <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4 items-center">
      <!-- Image content -->
      <div v-for="(logo, index) in data.logos" :key="index"
              class="flex-shrink-0  rounded-lg border-2 p-4 flex items-center justify-center h-full w-full">
              <img :src="logo" alt="Company logo" class="h-24 w-24" />
            </div>
      </div>

    <!-- Read more link -->
    <div class="flex justify-center pt-4">
      <a :href="data.link.url"
        class="inline-flex items-center text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 transition-colors font-medium">
        {{ data.link.text }}
        <svg class="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
        </svg>
      </a>
    </div>
  </section>
</template>
<script setup>
import FramedTitle from "./FramedTitle.vue";
const props = defineProps({
  data: {
    type: Object,
    required: true,
  }
});
</script>
<style scoped>
</style>