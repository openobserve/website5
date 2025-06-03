<template>
  <div class="border rounded-lg p-4 space-y-4">
    <h3 class="text-2xl font-bold">{{ data.title }}</h3>
    <p class="text-gray-500">{{ data.description }}</p>
    <ul class="space-y-2">
      <li v-for="item in data.items" :key="item.id" class="flex items-center gap-2">
        <Check class="h-5 w-5 text-primary-purple" />
        <span>{{ item.title }}</span>
      </li>
    </ul>
    <a :href="data.primaryButton.link" :target="data.primaryButton.target">
      <button class="bg-primary-purple hover:bg-dark-purple text-white w-full px-4 py-2 rounded-md cursor-pointer">
        {{ data.primaryButton.text }}
      </button>
    </a>
  </div>
</template>

<script setup>
import { Check } from "lucide-vue-next";
defineProps({ data: Object });
</script>
<style scoped>

/*  */
:deep(.v-html-content a) {
  color: #3b82f6;
  text-decoration: underline;
}

/* Remove underline for <a> inside buttons */
:deep(button a) {
  text-decoration: none;
  color: inherit;
}
</style>