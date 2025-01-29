<script setup>
import { defineProps } from "vue";

const props = defineProps({
  cards: {
    type: Array,
    required: true,
    default: () => [],
  },
});
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4">
    <div
      v-for="(item, index) in cards"
      :key="index"
      class="rounded-2xl w-full p-[0.0625rem] shadow-md bg-gradient-gray transition-all duration-100 hover:shadow-2xl cardShadow"
    >
      <!-- Content Layer -->
      <div
        class="flex flex-col space-y-4 w-full h-full items-center justify-center rounded-2xl bg-[#23282c] hover:bg-[#14181B] p-8"
      >
        <img :src="item.icon" alt="Icon" class="w-16 h-16 object-cover" />
        <h3 class="text-[#BEC0C2] text-base font-semibold" :title="item.title">
          {{ item.title }}
        </h3>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cardShadow {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in-out;
}
.cardShadow:hover {
  box-shadow: 0 0 30px rgba(66, 174, 255, 0.8);
}
</style>
