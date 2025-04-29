<template>
  <section id="our-commitment" class="space-y-8 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
    <!-- Title with horizontal lines -->
    <div class="flex items-center gap-4">
      <div class="h-px flex-1 bg-gray-200 "></div>
      <h2 class="text-2xl font-bold tracking-tight sm:text-3xl text-gray-900 whitespace-nowrap">
        {{ data.title }}
      </h2>
      <div class="h-px flex-1 bg-gray-200 "></div>
    </div>

    <!-- Content grid -->
    <div class="bg-light-gray rounded-lg p-8 shadow-sm border border-border">
      <!-- Text content -->
      <div class="space-y-4 text-gray-600">
        <div class="text-lg mb-4" v-html="data.paragraphs"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true,
  }
});
</script>