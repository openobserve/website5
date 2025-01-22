<script setup>
import { defineProps } from "vue";

// Define props
defineProps({
  cards: {
    type: Array,
    required: true,
  },
});

// Define methods
function truncate(text, maxLength = 200) {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
}
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div
      class="rounded-lg w-full p-0.5 shadow-md bg-gradient-blue text-start transition-all duration-300 hover:shadow-2xl cardShadow"
      v-for="(item, index) in cards"
      :key="index"
    >
      <!-- Content Layer -->
      <div
        class="flex flex-col space-y-4 w-full h-full rounded-lg bg-[#23282c] p-8"
      >
        <img :src="item.icon" alt="Icon" class="w-16 h-16 object-cover" />
        <h3
          class="text-[#BEC0C2] text-2xl font-bold truncate"
          :title="item.title"
        >
          {{ item.title }}
        </h3>
        <p class="text-[#DCDCDF] text-base">
          {{ truncate(item.description, 200) }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cardShadow:hover {
  box-shadow: 0 0 60px 0 rgba(66, 174, 255, 0.8); /* Shadow effect */
  border-radius: 0.5rem;
}
</style>
