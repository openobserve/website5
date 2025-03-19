<script setup>
// import CustomRoundShape from "../core/CustomRoundShape.vue";
import LandingCircularFrame from "../core/LandingCircularFrame.vue";

const props = defineProps({
  card: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="h-14">
    <LandingCircularFrame :imgSrc="card.image" iconSize="small" size="small" />
  </div>
  <div class="flex flex-col gap-2">
    <h2 class="font-semibold text-[16px] sm:text-[18px] md:text-[20px] m-0 text-[#14181B]">
      {{ card.title }}
    </h2>
    <p class="text-[12px] sm:text-[14px] md:text-[16px] m-0 text-[#23282C]">
      {{ card.description }}
    </p>
  </div>
</template>
