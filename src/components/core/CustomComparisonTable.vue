<script setup>
import CustomSection from "./CustomSection.vue";
import Heading from "./Heading.vue";

const props = defineProps({
  heading: {
    type: Object,
    required: false,
  },
  features: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <CustomSection>
    <!-- <div class="w-full container mx-auto px-4"> -->
    <!-- Title -->
    <!-- <h2
      class="text-2xl md:text-4xl font-semibold text-white text-center mb-6 md:mb-12"
    >
      {{ title }}
    </h2> -->
    <Heading :title="heading?.title" s />

    <!-- Comparison Table -->
    <div
      class="rounded-xl border border-gray-500 lg:border-transparent overflow-hidden backdrop-blur-sm bg-cover bg-center bg-no-repeat bg-[url('/img/bg/gradient-bg/Eclipse.svg'),url('/img/bg/gradient-bg/Eclipse(1).svg'),url('/img/bg/gradient-bg/Eclipse(2).svg')] mt-5 md:mt-10">
      <!-- Table Header -->
      <div class="grid grid-cols-[1fr_2fr_2fr] text-white border-b border-gray-700">
        <!-- Feature Column -->
        <div class="p-2 md:p-5 font-medium text-gray-400">Feature</div>

        <!-- Cloud Column -->
        <div class="p-2 md:p-5 font-medium text-base md:text-lg text-blue-400 border-x border-gray-700">
          Cloud
        </div>

        <!-- Self-Hosted Column -->
        <div class="p-2 md:p-5 font-medium text-base md:text-lg text-orange-400">
          Self-Hosted
        </div>
      </div>

      <!-- Table Body -->
      <div class="divide-y divide-gray-700">
        <div v-for="(item, index) in features" :key="index" class="grid grid-cols-[1fr_2fr_2fr] text-white">
          <!-- Feature Column -->
          <div class="p-2 md:p-5 text-wrap text-xs md:text-base text-gray-300">
            {{ item.feature }}
          </div>

          <!-- Cloud Column -->
          <div class="p-2 md:p-5 text-wrap text-xs md:text-base border-x border-gray-700">
            {{ item.cloud }}
          </div>

          <!-- Self-Hosted Column -->
          <div class="p-2 md:p-5 text-wrap text-xs md:text-base">
            {{ item.selfHosted }}
          </div>
        </div>
      </div>
    </div>
  </CustomSection>
  <!-- </div> -->
</template>
