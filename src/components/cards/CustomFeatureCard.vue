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
  // New prop to select layout (flex or column)
  layout: {
    type: String,
    default: "flex", // Default is 'flex'
    validator: (value) => ["flex", "column"].includes(value), // Only allow 'flex' or 'column'
  },
  columns: {
    type: Number,
    default: 3,
  },
});
</script>

<template>
  <div
    :class="`grid grid-cols-2 md:grid-cols-2 lg:grid-cols-${columns} gap-10 w-full`"
  >
    <div
      class="flex gap-4"
      v-for="(item, index) in cards"
      :key="index"
      :class="layout === 'column' ? 'flex-col justify-start' : 'flex-row'"
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
