<script setup>
import { defineProps } from "vue";
import CustomButton from "../core/CustomButton.vue";

defineProps({
  cards: {
    type: Object,
    required: true,
  },
  // buttons: {
  //   type: Array, // Array of button objects [{ label: "Button Title", variant: "primary" }]
  //   required: true,
  // },
});

function truncate(text, maxLength = 100) {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
}
</script>

<template>
  <div
    class="flex flex-col p-6 bg-[#1A1D1F] rounded-lg cursor-pointer transition-all duration-300 gap-3 hover:bg-[#1F2225] cardShadow"
  >
    <h2 class="text-xl font-semibold text-[#BEC0C2] mb-1">{{ cards.title }}</h2>

    <div class="flex items-center gap-2 mb-3">
      <span class="text-sm text-[#F4F4F5]">{{ cards.position }}</span>
      <span class="text-sm text-[#F4F4F5]">{{ cards.location }}</span>
      <span class="text-[#F4F4F5]">|</span>
      <span class="text-sm text-[#F4F4F5]">{{ cards.experience }}</span>
    </div>

    <div class="text-sm text-white mb-4">
      {{ truncate(cards.description) }}
    </div>
    <!-- <CustomButton
          v-for="(button, index) in buttons"
          :key="index"
          :variant="button.variant"
          class=""
        >
          {{ button.label }}
        </CustomButton> -->
    <div class="text-center">
      <a
        href="#"
        class="text-[#42AEFF] text-sm font-medium hover:text-[#3498FF] transition-colors duration-300"
      >
        VIEW DETAILS
      </a>
    </div>
  </div>
</template>

<style scoped>
.hover\:bg-\[\#1F2225\]:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.cardShadow:hover {
  box-shadow: 0 0 60px 0 rgba(66, 174, 255, 0.8);
  /* Shadow effect */
  border-radius: 0.5rem;
}
</style>
