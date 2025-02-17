<script setup>
import { generateTagLink } from "../../utils/redirection";

const props = defineProps({
  suggestions: { type: Array, required: true },
  type: { type: String, required: true },
});

</script>

<template>
   <!-- <h1 class="text-white font-semibold py-6">Tags</h1> -->
  <div class="flex flex-wrap gap-2 w-full  justify-center max-h-full overflow-visible">

    <a
      v-for="(suggestion, index) in suggestions"
      :key="index"
      :href="generateTagLink(type, suggestion.name)"
      class="px-4 md:px-6 py-1 bg-black border rounded-full hover:text-white text-xs md:text-sm text-neutral-400"
    >
      {{ suggestion.name }}
  </a>
  </div>
</template>
