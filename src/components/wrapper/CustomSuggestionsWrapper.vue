<script setup>
import { generateTagLink } from "../../utils/redirection";

defineProps({
  suggestions: { type: Array, required: true },
  type: { type: String, required: true },
});


</script>

<template>
   <!-- <h1 class="text-white font-semibold py-6">Tags</h1> -->
  <div class="flex flex-wrap gap-2 w-full justify-center md:justify-center max-h-full overflow-visible">
   
    <a
      v-for="(suggestion, index) in suggestions"
      :key="index"
       :href="generateTagLink(type, suggestion.name)"
      class="px-6 py-1 bg-black border rounded-full hover:text-white text-sm text-neutral-400"
    >
      {{ suggestion.name }}
  </a>
  </div>
</template>
