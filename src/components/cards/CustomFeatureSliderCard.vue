<script setup>
import CustomRoundShape from "../core/CustomRoundShape.vue";
const props = defineProps({
  cards: {
    type: Array,
    required: true,
  },
  titleTextColor: {
    type: String,
    default: "text-[#E2E3E5]",
    required: false,
  },
  descriptionTextColor: {
    type: String,
    default: "text-[#BEC0C2]",
    required: false,
  },
});
</script>
<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
    <div class="flex gap-4" v-for="(item, index) in cards" :key="index">
      <div class="h-14">
        <CustomRoundShape
          :imgSrc="item.icon"
          iconSize="small"
          borderColor="bg-gradient-gray"
          size="small"
        />
      </div>
      <div class="flex flex-col gap-2">
        <h2
          :class="`font-semibold text-[16px] sm:text-[18px] md:text-[20px] m-0 ${titleTextColor}`"
        >
          {{ item.title }}
        </h2>
        <p
          :class="`text-[12px] sm:text-[14px] md:text-[16px] m-0 ${descriptionTextColor}`"
        >
          {{ item.description }}
        </p>
      </div>
    </div>
  </div>
</template>
