<script setup>
import { defineProps } from "vue";
import CustomImage from "../core/CustomImage.vue";

// Define props
defineProps({
  cards: {
    type: Object,
    required: true,
  },
});

// Define methods
function truncate(text, maxLength = 200) {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
}
</script>

<template>

  <!-- Content Layer -->
  <div class="flex flex-col space-y-4 w-full h-full rounded-lg bg-[#23282c] p-8 cardShadow">
    <CustomImage :src="cards.icon" alt="Icon" cssClass="w-16 h-16 object-cover" />
    <h3 class="text-[#BEC0C2] text-2xl font-bold truncate" :title="cards.title">
      {{ cards.title }}
    </h3>
    <p class="text-[#DCDCDF] text-base">
      {{ truncate(cards.description, 200) }}
    </p>
  </div>
</template>

<style scoped>
.cardShadow:hover {
  box-shadow: 0 0 60px 0 rgba(66, 174, 255, 0.8);
  /* Shadow effect */
  border-radius: 0.5rem;
}
</style>
