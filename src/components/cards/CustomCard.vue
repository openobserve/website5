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
<div class="relative rounded-lg w-full p-[0.0625rem] bg-gradient-blue transition-all duration-300 hover:shadow-[0_0_60px_0_rgba(66,174,255,0.8)] container mx-auto">
  <!-- Content Layer -->
  <div class="flex flex-col space-y-4 w-full h-full items-center rounded-lg bg-[#23282c] p-8">
    <CustomImage :image="cards.image" altText="Icon" cssClass="h-16" />
    <h3 class="text-[#BEC0C2] text-2xl font-bold truncate" :title="cards.title">
      {{ cards.title }}
    </h3>
    <p class="text-[#DCDCDF] text-base">
      {{ truncate(cards.description, 200) }}
    </p>
  </div>
</div>
</template>
