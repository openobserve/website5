<script setup>
import { defineProps } from "vue";
import CustomButton from "../core/CustomButton.vue";
import CustomSuggestions from "./CustomSuggestionsWrapper.vue";
import CustomSection from "../core/CustomSection.vue";

// Define props for the component
defineProps({
  title: {
    type: String,
    required: true,
  },
  bottomImage: {
    type: String,
  },
  suggestions: {
    type: Array || null,
  },
  content: {
    type: String || null,
  }
});
</script>

<template>
  <CustomSection class="min-h-screen pt-10">
    <div>
      <div
        class="flex justify-center items-center text-white text-sm py-4"
      >
        <template v-for="(item, index) in activity" :key="`item-${index}`">
          <span>{{ item }}</span>
          <span v-if="index !== activity.length - 1" :key="`sep-${index}`"
            >|</span
          >
        </template>
      </div>
      <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-white">
        {{ title }}
      </h1>
      <div
        class="flex items-center justify-start  w-full py-6 flex-col md:flex-row md:px-6"
      >
      <!-- {{ console.log(suggestions,"suggestionssuggestionssuggestionssuggestions") }} -->
        <!-- Suggestions -->
        <CustomSuggestions
          :suggestions="suggestions"
          @selectSuggestion="selectSuggestion"
          class="flex flex-wrap gap-4 justify-center md:justify-start"
        />

        <!-- Icons Container -->
        <div class="flex items-center gap-4 mt-4 md:mt-0 justify-center md:justify-end">
          <div
            v-for="(icon, index) in [
              'slack.svg',
              'twitter.svg',
              'Linkedin.svg',
              'GitHub.svg',
            ]"
            :key="index"
            class="flex items-center space-x-2 justify-center"
          >
            <img :src="`/${icon}`" :alt="`${icon} Icon`" class="w-10 h-10" />
          </div>
        </div>
      </div>
      <div class="flex items-center justify-center">
        <img
          :src="bottomImage"
          alt="Bottom Image"
          class="w-full object-contain"
        />
      </div>
    </div>
  </CustomSection>
</template>
