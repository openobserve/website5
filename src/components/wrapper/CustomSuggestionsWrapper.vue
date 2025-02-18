<script setup>
import { generateTagLink } from "../../utils/redirection";

const props = defineProps({
  suggestions: { type: Array, required: true },
  type: { type: String, required: true },
});

</script>

<template>
  <div class="flex flex-wrap justify-center items-center content-center gap-2 w-full max-h-full overflow-visible">
    <a
      v-for="(suggestion, index) in suggestions"
      :key="index"
      :href="generateTagLink(type, suggestion.name)"
      class="px-4 md:px-6 py-1 bg-black border rounded-full text-center hover:text-white text-xs md:text-sm text-neutral-400"
    >
      {{ suggestion.name }}
    </a>
  </div>
</template>

