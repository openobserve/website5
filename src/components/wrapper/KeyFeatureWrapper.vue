<script setup>
import CustomImage from "../core/CustomImage.vue";
import CustomSection from "../core/CustomSection.vue";
import Heading from "../core/Heading.vue";
import ObservablititySuiteWrapper from "./ObservablititySuiteWrapper.vue";

const props = defineProps({
  heading: {
    type: Object,
    required: false,
  },
  items: {
    type: Array,
    required: true,
  },
});
</script>
<template>
  <CustomSection>
    <Heading :title="heading?.title" :description="heading?.subtitle" />
    <div
      v-for="(item, index) in items"
      :class="[
        'flex flex-col-reverse space-y-4 md:space-y-0 md:space-x-6 items-center py-4 md:py-12',
        index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse',
      ]"
    >
      <!-- Text Container -->
      <div
        class="flex flex-col space-y-3 text-center md:text-left px-4 sm:px-6 md:w-2/3"
      >
        <h2
          class="text-white font-inter font-bold text-lg sm:text-xl md:text-2xl lg:text-4xl"
        >
          {{ item.title }}
        </h2>
        <p
          class="font-inter font-medium text-xs sm:text-sm md:text-lg lg:text-xl text-white"
          v-html="item?.description"
        ></p>
      </div>

      <!-- Image Container -->
      <div class="flex items-center justify-center md:w-1/3 pb-4">
        <div class="bg-gray-700 bg-opacity-50 p-3 sm:p-4 rounded-lg">
          <CustomImage
            v-if="item?.image"
            :image="item?.image"
            :altText="item?.image"
            class="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
          />
        </div>
      </div>
    </div>
  </CustomSection>
</template>
s
