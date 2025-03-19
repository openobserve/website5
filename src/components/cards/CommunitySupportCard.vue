<script setup>
import { defineProps } from "vue";
import CustomImage from "../core/CustomImage.vue";

const props = defineProps({
  cards: {
    type: Array,
    required: true,
    default: () => [],
  },
});
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
    <a
      v-for="(item, index) in cards"
      :key="index"
      :href="item.link"
      target="_blank"
      rel="noopener noreferrer"
      class="rounded-2xl w-full p-[0.0625rem] shadow-md bg-gradient-gray transition-all duration-100 hover:shadow-2xl cardShadow block"
    >
      <!-- Content Layer -->
      <div
        class="flex flex-col space-y-4 w-full h-full items-center justify-center rounded-2xl bg-[#23282c] hover:bg-[#14181B] p-8">
        <CustomImage :image="item.image" altText="Icon" cssClass="w-16 h-16 object-cover" />
        <h3 class="text-[#BEC0C2] text-base font-semibold" :title="item.title">
          {{ item.title }}
        </h3>
      </div>
    </a>
  </div>
</template>

<style scoped>
.cardShadow {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in-out;
}

.cardShadow:hover {
  box-shadow: 0 0 30px rgba(66, 174, 255, 0.8);
}
</style>
