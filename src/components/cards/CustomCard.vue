<script setup>
import { defineProps } from "vue";

// Define props
defineProps({
  cards: {
    type: Array,
    required: true,
  },
});

// Define methods
function truncate(text, maxLength = 100) {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
}
</script>

<template>
  <div class="flex flex-wrap justify-center gap-4 p-4">
    <div
      class="card rounded-lg p-4 w-72 shadow-md flex flex-col items-start text-start transition-all duration-300 hover:shadow-lg"
      v-for="(item, index) in cards"
      :key="index"
    >
      <div class="mb-4">
        <img :src="item.icon" alt="Icon" class="w-10 h-10" />
      </div>
      <div>
        <h3 class="text-[#BEC0C2] text-lg font-bold mb-2">{{ item.title }}</h3>
        <p class="text-[#DCDCDF] text-sm card-description">
          {{ truncate(item.description) }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  background: #23282c;
  border-radius: 20px;
  border-image: linear-gradient(rgb(208, 251, 255), rgb(119, 139, 255)) 1;
}
.card:hover {
  background-image: linear-gradient(
    to right,
    rgba(49, 53, 57),
    rgba(31, 34, 38)
  );
  box-shadow: 0 0 100px 0 rgba(39, 127, 176); /* Shadow effect */
}
.card-description {
  line-height: 1.4;
  display: -webkit-box;
  display: box;
  -webkit-line-clamp: 3; /* Limit to 3 lines */
  -webkit-box-orient: vertical;
  line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
