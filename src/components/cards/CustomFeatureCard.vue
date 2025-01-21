<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
    <div
      class="flex gap-4 shadow-md transition-transform duration-300 ease-in-out"
      v-for="(item, index) in cards"
      :key="index"
    >
      <div class="h-14">
        <CustomRoundShape
          :imgSrc="item.icon"
          iconSize="small"
          borderColor="bg-gradient-blue"
          size="small"
        />
      </div>
      <div class="flex flex-col gap-2">
        <h2 class="text-[#E2E3E5] font-semibold text-[18px] m-0">
          {{ item.title }}
        </h2>
        <p class="text-[#BEC0C2] text-[14px] m-0 leading-6">
          {{ item.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import CustomRoundShape from "../core/CustomRoundShape.vue";
const props = defineProps({
  cards: {
    type: Array,
    required: true,
  },
});
</script>
