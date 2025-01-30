<script setup>
import { defineProps } from "vue";
import CustomImage from "../core/CustomImage.vue";

const props = defineProps({
  card: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div
    class="rounded-2xl w-full p-[0.0625rem] shadow-md bg-gradient-gray hover:bg-gradient-blue transition-all duration-300 hover:shadow-2xl cardShadow container mx-auto"
  >
    <!-- Content Layer -->
    <div
      class="flex flex-col space-y-4 w-full h-full items-center justify-center rounded-2xl bg-[#23282c] p-8"
    >
      <CustomImage :src="card.icon" alt="Icon" cssClass="w-16 h-16 object-cover" />
      <h3 class="text-[#BEC0C2] text-base font-semibold" :title="card.title">
        {{ card.title }}
      </h3>
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
