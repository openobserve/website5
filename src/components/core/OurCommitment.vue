<template>
  <section id="our-commitment" class=" sm:px-6">
    <CustomSection sectionClass="!pb-0">
      <!-- Title -->
      <div class="text-center mb-8">
        <h2 class="text-2xl font-bold tracking-tight sm:text-3xl text-gray-900">
          {{ title }}
        </h2>
      </div>

      <!-- Content grid -->
      <div class="bg-light-gray rounded-lg p-4 sm:p-6 md:p-8 shadow-sm border border-border mx-auto w-full">
        <!-- Text content -->
        <div class="space-y-4 text-gray-600">
          <div class="text-base sm:text-lg mb-3 sm:mb-4 md:mb-6" v-html="paragraph"></div>
        </div>
      </div>
    </CustomSection>
  </section>
</template>

<script setup>
import CustomSection from "./CustomSection.vue";
import FramedTitle from "./FramedTitle.vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  paragraph: {
    type: String,
    required: true,
  }
});
</script>