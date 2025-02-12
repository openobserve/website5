<script setup>
import CustomSection from "../core/CustomSection.vue";

const props = defineProps({
  title: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
});
</script>

<template>
  <!-- <CustomSection> -->
  <div
    class="flex flex-col md:flex-row justify-between gap-4 w-full items-center py-10 container mx-auto px-5"
  >
    <div class="w-full md:w-1/3">
      <h2 class="text-xl sm:text-2xl md:text-4xl font-semibold text-white">
        {{ title }}
      </h2>
    </div>
    <div class="w-full md:w-2/3">
      <p
        v-html="description"
        class="text-white text-base md:text-lg xl:text-xl"
      ></p>
    </div>
  </div>
  <!-- </CustomSection> -->
</template>
