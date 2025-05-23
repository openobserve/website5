<template>
  <section id="our-story">
    <CustomSection sectionClass="!pb-0">
      <FramedTitle :title="title" />
      <div class="flex flex-col-reverse gap-6 lg:flex-row items-center">
        <div class="flex flex-col space-y-4 w-full lg:w-1/2">
          <div class="space-y-4 text-gray-600">
            <div class="text-base md:text-lg" v-html="paragraphs"></div>
          </div>
          <div class="flex justify-start pt-2 md:pt-4" v-if="primaryButton">
            <a :href="primaryButton?.link"
              class="inline-flex items-center text-white bg-primary-purple hover:bg-dark-purple px-4 py-2 md:p-3 rounded-md transition-colors font-medium text-sm md:text-base">
              {{ primaryButton?.text }}
            </a>
          </div>
        </div>
        <div class="relative h-64 w-full sm:h-80 md:h-96 lg:h-[28rem] lg:w-1/2 rounded-lg overflow-hidden bg-gray-100">
          <img :src="image.src" :alt="image.alt" class="w-full h-full" loading="lazy" />
        </div>
      </div>

      <!-- Read more link -->
      <div class="flex justify-center pt-2 md:pt-4" v-if="secondaryButton">
        <a :href="secondaryButton?.link"
          class="inline-flex items-center text-purple-600 hover:text-purple-800 transition-colors font-medium mt-2 md:mt-4 text-sm md:text-base">
          {{ secondaryButton?.text }}
          <svg class="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </a>
      </div>
    </CustomSection>
  </section>
</template>

<script setup>
import FramedTitle from "./FramedTitle.vue";
import CustomSection from "./CustomSection.vue";
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  paragraphs: {
    type: String,
    required: true,
  },
  image: {
    type: Object,
    required: true,
  },
  primaryButton: {
    type: Object,
    required: false,
  },
  secondaryButton: {
    type: Object,
    required: false,
  },
});
</script>