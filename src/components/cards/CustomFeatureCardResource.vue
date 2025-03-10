<script setup>
import CircularFrame from "../core/CircularFrame.vue";

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
  <a :href="card.link" target="_blank">
    <div
      class="container mx-auto border border-transparent hover:border hover:border-[#838484] transition-all duration-150 p-3 rounded-lg">
      <!-- Layout changes based on screen size -->
      <div class=" flex flex-col md:flex-row items-center md:items-start gap-6 ">
        <!-- Icon -->
        <div class=" h-14 w-14 flex-shrink-0">
          <CircularFrame :imgSrc="card.image" iconSize="small" :borderColor="borderColor" size="small" />
        </div>

        <!-- Title & Description -->
        <div class="flex flex-col text-center md:text-left">
          <h2 :class="`font-semibold text-[16px] sm:text-[18px] md:text-[20px] m-0 ${titleTextColor}`">
            {{ card.title }}
          </h2>
          <p :class="`text-[12px] sm:text-[14px] md:text-[16px] m-0 ${descriptionTextColor}`">
            {{ card.description }}
          </p>
        </div>
      </div>
    </div>
  </a>
</template>
