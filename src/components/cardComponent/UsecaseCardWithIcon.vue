<script setup>
import { defineProps } from "vue";
import CustomImage from "../core/CustomImage.vue";

const props = defineProps({
  card: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <div
    :class="[
      'rounded-2xl w-full p-[0.0625rem] shadow-md bg-gradient-blue transition-all duration-300 hover:shadow-2xl cardShadow',
      {
        'lg:col-span-2': index === 0 || index === 1,
        'lg:col-span-3': index === 2
      }
    ]"
  >
    <!-- Content Layer -->
    <div
      class="flex flex-col space-y-4 w-full h-full items-center justify-center rounded-2xl bg-[#23282c] p-8"
    >
      <CustomImage :image="card.icon" altText="Icon" cssClass="w-16 h-16 object-cover" />
      <h3 class="text-[#BEC0C2] text-base font-semibold" :title="card.title">
        {{ card.title }}
      </h3>
    </div>
  </div>
</template>

<style scoped>
.cardShadow:hover {
  box-shadow: 0 0 60px 0 rgba(66, 174, 255, 0.8);
  border-radius: 1rem;
  transition: all;
}
</style>
