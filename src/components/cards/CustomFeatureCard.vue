<script setup>
import { computed } from "vue";
import CustomRoundShape from "../core/CustomRoundShape.vue";

// Define component props
const props = defineProps({
  card: {
    type: Object,
    required: true,
  },
  titleTextColor: {
    type: String,
    default: "text-[#E2E3E5]",
  },
  descriptionTextColor: {
    type: String,
    default: "text-[#BEC0C2]",
  },
  borderColor: {
    type: String,
    default: "bg-gradient-blue",
  },
});

// Computed properties for dynamic class bindings
const titleClasses = computed(() => `font-semibold text-[16px] sm:text-[18px] md:text-[20px] m-0 ${props.titleTextColor}`);
const descriptionClasses = computed(() => `text-[12px] sm:text-[14px] md:text-[16px] m-0 ${props.descriptionTextColor}`);
</script>

<template>
  <div class="container mx-auto p-2 w-full">
    <div class="flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-2">
      <!-- Icon -->
      <div class="w-14 h-14 flex-shrink-0">
        <CustomRoundShape :imgSrc="card.image" iconSize="small" :borderColor="borderColor" size="small" />
      </div>

      <!-- Title & Description -->
      <div class="flex flex-col pt-[2vh]">
        <h2 :class="titleClasses">{{ card.title }}</h2>
        <p :class="descriptionClasses">{{ card.description }}</p>
      </div>
    </div>
  </div>
</template>
