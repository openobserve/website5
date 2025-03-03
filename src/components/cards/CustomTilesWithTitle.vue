<script setup>
import { defineProps } from "vue";
import CustomImage from "../core/CustomImage.vue";

const props = defineProps({
  cards: {
    type: Array,
    required: true,
    default: () => [],
  },
  parentBgColor: {
    type: String,
    default: "bg-gradient-gray", // Default background for the parent div
  },
  childBgColor: {
    type: String,
    default: "bg-[#23282c]", // Default background for the child div
  },
});
</script>

<template>
  <div
    class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 gap-2 md:gap-6"
  >
    <div
      :class="[
        parentBgColor,
        'rounded-2xl w-full p-[0.0625rem] shadow-md hover:bg-gradient-blue transition-all duration-300 hover:shadow-2xl cardShadow container mx-auto',
      ]"
      v-for="(item, index) in cards"
      :key="index"
    >
      <!-- Content Layer -->
      <div
        :class="[
          childBgColor,
          'flex flex-col space-y-4 w-full h-full items-center justify-center rounded-2xl p-8',
        ]"
      >
        <CustomImage
          :image="item.icon"
          altText="Icon"
          cssClass="w-16 h-16 object-cover"
        />
        <h3 class="text-[#BEC0C2] text-base font-semibold" :title="item.title">
          {{ item.title }}
        </h3>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cardShadow:hover {
  box-shadow: 0 0 60px 0 rgba(66, 174, 255, 0.8); /* Shadow effect */
  border-radius: 1rem;
  transition: all;
}
.cardShadow:hover h3 {
  color: #80b9ff;
}
</style>
