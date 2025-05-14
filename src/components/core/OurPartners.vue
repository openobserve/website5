<template>
  <section id="our-story">
    <CustomSection>
    <!-- Title with horizontal lines -->
    <FramedTitle :title="data.title" />
    <p class="text-center text-gray-600 text-lg">{{ data.description }}</p>
    <!-- Content grid -->
    <div class="grid gap-8 grid-cols-2 md:grid-cols-4 items-center mt-8">
      <!-- Image content -->
      <div v-for="(logo, index) in data.logos" :key="index"
              class="flex-shrink-0  rounded-lg border p-4 flex items-center justify-center h-full w-full">
              <img :src="logo" alt="Company logo" class="h-24 w-24" />
            </div>
      </div>

    <!-- Read more link -->
    <div class="flex justify-center pt-8">
      <a :href="data.link.url"
        class="inline-flex items-center text-purple-600 hover:text-purple-800 transition-colors font-medium">
        {{ data.link.text }}
        <svg class="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
        </svg>
      </a>
    </div>
    </CustomSection>
  </section>
</template>
<script setup>
import FramedTitle from "./FramedTitle.vue";
import CustomSection from "./CustomSection.vue";
const props = defineProps({
  data: {
    type: Object,
    required: true,
  }
});
</script>
<style scoped>
</style>