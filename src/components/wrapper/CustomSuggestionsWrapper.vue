<script setup>
defineProps({
  suggestions: { type: Array, required: true },
});

const emit = defineEmits(["selectSuggestion"]);

const selectSuggestion = (suggestion) => {
  emit("selectSuggestion", suggestion);
};
</script>

<template>
   <!-- <h1 class="text-white font-semibold py-6">Tags</h1> -->
  <div class="flex flex-wrap gap-2 w-full justify-center md:justify-center">
   
    <button
      v-for="(suggestion, index) in suggestions"
      :key="index"
      @click="selectSuggestion(suggestion)"
      class="px-6 py-1 bg-black border rounded-full hover:text-white text-sm text-neutral-400"
    >
      {{ suggestion.name }}
    </button>
  </div>
</template>
