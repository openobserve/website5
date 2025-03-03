<script setup>
import { defineProps } from "vue";
import CustomImage from "../core/CustomImage.vue";

// Define props
const props = defineProps({
  cards: {
    type: Object,
    required: true,
  },
});

// Define methods
function truncate(text, maxLength = 200) {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
}
const dynamicComponent = props.cards.link ? "a" : "div";
</script>

<template>
  <dynamicComponent :href="cards?.link">
    <div
      class="rounded-lg w-full h-full p-[0.0625rem] bg-gradient-blue transition-all duration-300 hover:shadow-[0_0_60px_0_rgba(66,174,255,0.8)] container mx-auto group"
    >
      <!-- Content Layer -->
      <div
        class="flex flex-col space-y-4 w-full h-full items-center rounded-lg bg-[#23282c] p-8"
      >
        <CustomImage :image="cards.image" cssClass="h-16" />
        <h3
          class="text-[#BEC0C2] text-2xl font-bold truncate"
          :title="cards.title"
        >
          {{ cards.title }}
        </h3>
        <p class="text-[#DCDCDF] text-base">
          {{ cards.description }}
        </p>
      </div>
    </div>
  </dynamicComponent>
</template>
