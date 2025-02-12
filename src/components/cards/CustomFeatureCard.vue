<script setup>
import CustomRoundShape from "../core/CustomRoundShape.vue";

const props = defineProps({
  card: {
    type: Object,
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
  borderColor: {
    type: String,
    default: "bg-gradient-blue",
    required: false,
  },
});
</script>

<template>
  <div class="container mx-auto p-4">
    <!-- Main Row Layout -->
    <div class="flex gap-6">
      <!-- Left Side: Icon -->
      <div class="w-14 h-14 flex-shrink-0">
        <CustomRoundShape
          :imgSrc="card.image"
          iconSize="small"
          :borderColor="borderColor"
          size="small"
        />
      </div>

      <!-- Right Side: Title & Description -->
      <div class="flex flex-col">
        <h2
          :class="`font-semibold text-[16px] sm:text-[18px] md:text-[20px] m-0 ${titleTextColor}`"
        >
          {{ card.title }}
        </h2>
        <p
          :class="`text-[12px] sm:text-[14px] md:text-[16px] m-0 ${descriptionTextColor}`"
        >
          {{ card.description }}
        </p>
      </div>
    </div>
  </div>
</template>
