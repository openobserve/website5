<script setup>
import { onMounted } from "vue";
import { slugify } from "../../utils/slugify";

defineProps({
  suggestions: { type: Array, required: true },
});

const navigateToTag = (tagName) => {
  if (typeof window !== "undefined") {
    window.location.assign(`/blog/tag/${tagName}`);
  }
};
</script>

<template>
   <!-- <h1 class="text-white font-semibold py-6">Tags</h1> -->
  <div class="flex flex-wrap gap-2 w-full justify-center md:justify-center">
   
    <button
      v-for="(suggestion, index) in suggestions"
      :key="index"
      @click="navigateToTag(suggestion.name)"
      class="px-6 py-1 bg-black border rounded-full hover:text-white text-sm text-neutral-400"
    >
      {{ suggestion.name }}
    </button>
  </div>
</template>
