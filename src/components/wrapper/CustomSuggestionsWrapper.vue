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
  <div class="flex flex-wrap gap-4 w-full md:w-3/5 justify-center md:justify-center">
    <button
      v-for="(suggestion, index) in suggestions"
      :key="index"
      @click="selectSuggestion(suggestion)"
      class="px-6 py-1 bg-black border rounded-full hover:text-white text-sm text-neutral-400"
    >
      {{ suggestion }}
    </button>
  </div>
</template>
