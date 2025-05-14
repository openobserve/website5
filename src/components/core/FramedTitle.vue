<template>
    <!-- Title with horizontal lines -->
    <div class="flex items-center gap-4 mb-12">
      <div class="h-px flex-1 bg-gray-200 "></div>
      <h2 class="text-2xl font-bold tracking-tight sm:text-3xl text-gray-900 whitespace-nowrap">
        {{ title }}
      </h2>
      <div class="h-px flex-1 bg-gray-200 "></div>
    </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: Object,
    required: true,
  }
});
</script>
<style scoped></style>