<script setup>
import { generateTagLink } from "../../utils/redirection";

const props = defineProps({
  suggestions: { type: Array, required: true },
  type: { type: String, required: true },
});
</script>

<template>
  <section
    class="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-11 py-2 w-full flex flex-col justify-center"
  >
    <div
      class="flex flex-wrap justify-center items-center content-center gap-2 z-20"
    >
      <a
        v-for="(suggestion, index) in suggestions"
        :key="index"
        :href="generateTagLink(type, suggestion.name)"
        class="px-4 md:px-6 py-1 bg-black border rounded-full text-center hover:text-white text-xs md:text-sm text-neutral-400"
      >
        {{ suggestion.name }}
      </a>
    </div>
  </section>
</template>
