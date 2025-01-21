<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
    <div 
      v-for="(item, index) in cards" 
      :key="index"
      class="flex gap-4 p-6 bg-black rounded-lg shadow-lg transition-transform duration-300 ease-in-out"
    >
      <div class="flex-shrink-0 w-[60px] h-[60px] rounded-full border border-sky-500 flex items-center justify-center p-3">
        <img 
          :src="item.icon" 
          :alt="item.title" 
          class="w-full h-full object-contain"
        />
      </div>
      
      <div class="flex flex-col gap-2">
        <h2 class="text-[18px] font-semibold text-[#E2E3E5] m-0">
          {{ item.title }}
        </h2>
        <p class="text-[14px] text-[#BEC0C2] m-0 leading-6">
          {{ item.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  cards: {
    type: Array,
    required: true,
  },
});
</script>