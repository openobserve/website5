<script setup>
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
  <div
    class="flex flex-col md:flex-row justify-center items-center text-center md:text-left gap-6 w-full py-6 container mx-auto px-5">
    <div class="w-full md:w-1/3">
      <h2 class="text-xl sm:text-2xl md:text-4xl font-semibold text-white">
        {{ title }}
      </h2>
    </div>
    <div class="w-full md:w-2/3">
      <p v-html="description" class="text-white text-base md:text-lg xl:text-xl !m-0 !p-0 !leading-snug"></p>
    </div>
  </div>
</template>
