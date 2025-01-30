<!-- FeatureItem.vue -->
<template>
  <div class="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
    <span class="text-blue-600">•</span>
    <span class="font-medium">{{ title }}</span>
  </div>
</template>

<script setup>
defineProps({
  title: String,
});
</script>
