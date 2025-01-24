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
   <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6">
    <div
      v-for="(item, index) in cards"
      :key="index"
      :class="[
        'rounded-2xl w-full p-[0.0625rem] shadow-md bg-gradient-blue transition-all duration-300 hover:shadow-2xl cardShadow',
        {
          'lg:col-span-2': index === 0 || index === 1,
          'lg:col-span-3': index === 2
        }
      ]"
    >
      <!-- Content Layer -->
      <div
        class="flex flex-col space-y-4 w-full h-full items-center justify-center  rounded-2xl bg-[#23282c] p-8"
      >
        <img :src="item.icon" alt="Icon" class="w-16 h-16 object-cover" />
        <h3
          class="text-[#BEC0C2] text-base font-semibold"
          :title="item.title"
        >
          {{ item.title }}
        </h3>
      </div>
    </div>
      <!-- static card -->
      <div
      class="rounded-2xl w-full p-[0.0625rem] shadow-md bg-gradient-blue hover:bg-gradient-blue transition-all duration-300 hover:shadow-2xl cardShadow"
    >
      <div
        class="flex flex-col space-y-4 w-full h-full items-center justify-center rounded-2xl bg-[#23282c] p-8 "
      >
      <div class="w-16 h-16 overflow-hidden">
          <img src="CardSeeALLicon.svg" alt="View all use cases" class="w-full h-full object-cover" />
        </div>
        <h3 class="text-[#BEC0C2] text-base font-semibold">View all use cases</h3>
      </div>
    </div>
    <!-- static card -->
  </div>
</template>

<style scoped>
.cardShadow:hover {
  box-shadow: 0 0 60px 0 rgba(66, 174, 255, 0.8); /* Shadow effect */
  border-radius: 1rem;
  transition:all;
}
</style>