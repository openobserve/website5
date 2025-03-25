<script setup>
import CustomSuggestions from "./CustomSuggestionsWrapper.vue";
import CustomSection from "../core/CustomSection.vue";
import { generateAuthorLink } from "@/utils/redirection";
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
  },
  activity: {
    type: Array,
    required: false,
  },
  type: {
    type: String,
    default: "blog",
  },
  author: {
    type: Object,
    required: false,
  },
  publishDate: {
    type: String,
    required: false,
  },
});
</script>

<template>
  <CustomSection class="pt-10">
    <div>
      <div
         class="flex flex-col md:flex-row justify-center items-center text-white text-sm py-4"
       >
         <template>
           <div class="flex">
             <span v-if="author" class="px-2">
               <a
                 v-if="author.slug"
                 :href="generateAuthorLink(type, author.slug)"
                 class="text-white hover:underline"
                 >{{ author.name }}</a
               >
               <span v-else>{{ author.name }}</span>
             </span>
 
             <span class="hidden md:block" v-if="author && publishDate">|</span>
 
             <span v-if="publishDate" class="px-2">{{ publishDate }}</span>
           </div>
         </template>
       </div>
      <!-- <div class="flex flex-col md:flex-row justify-center items-center text-white text-sm py-4">
        <template v-for="(item, index) in activity" :key="`item-${index}`">
          <span class="px-2">{{ item }}</span>
          <span class="hidden md:block" v-if="index !== activity.length - 1" :key="`sep-${index}`">|</span>
        </template>
      </div> -->
      <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-white">
        {{ title }}
      </h1>
      <div class="flex items-center justify-start  w-full py-6 flex-col md:flex-row md:px-6">
        <!-- Suggestions -->
        <CustomSuggestions :suggestions="suggestions" :type="type"
          class="flex flex-wrap gap-4 justify-center " />
        <!-- Icons Container -->
        <!-- <div class="flex items-center gap-4 mt-4 md:mt-0 justify-center md:justify-end">
          <span class="text-white text-sm">Share:</span>

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
        </div> -->
      </div>
      <!-- <div class="">
        <img
          :src="bottomImage"
          alt="Bottom Image"
          class="w-full object-contain"
        />
      </div> -->
      <!-- <div
        class="flex items-center justify-center  w-full  "> -->
        <!-- <div class="absolute inset-0 blur-3xl" :style="'background-image: url(' + bottomImage + ');'"></div> -->
        <img :src="bottomImage" class="object-center mx-auto object-cover max-h-[60vh] bg-white" />
      <!-- </div> -->
    </div>
  </CustomSection>
</template>
