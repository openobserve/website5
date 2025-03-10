<script setup>
import CustomSection from "../core/CustomSection.vue";
import CustomFeatureCardResource from "../cards/CustomFeatureCardResource.vue";
import CustomButton from "../core/CustomButton.vue";
import { computed } from "vue";

const props = defineProps({
  heading: {
    type: Object,
    required: false,
  },
  items: {
    type: Array,
    required: true,
  },
  noOfGridColumn: {
    type: Number,
    required: true,
    default: 3,
  },
  primaryButton: {
    type: Object,
    required: true,
  },
});

</script>

<template>
  <div class="pt-10">
    <CustomSection class="bg-opacity-80 backdrop-blur-lg shadow-lg rounded-lg glass-card">
      <div>
        <!-- Main Content -->
        <div class="w-full text-white mt-2">
          <h1 class="text-xl sm:text-2xl md:text-3xl font-semibold text-center">
            {{ heading?.title }}
          </h1>
          <p class="text-sm md:text-lg xl:text-xl my-4 text-center">
            {{ heading?.subtitle }}
          </p>
        </div>
        <!-- <div
          :class="[
            'pt-[3vh] grid grid-cols-2 md:grid-cols-2 lg:grid-cols-' + noOfGridColumn,
            'gap-10 w-full',
            items.length % 2 !== 0 ? 'sm:[&>*:nth-last-child(1)]:col-span-2 ' : '',
          ]"
        > -->
        <div :class="[
          `pt-3 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-${noOfGridColumn} gap-10 w-full`,
          items.length % 2 !== 0
            ? '[&>*:nth-last-child(1)]:col-span-2 sm:[&>*:nth-last-child(1)]:col-span-1'
            : '',
        ]">
          <div v-for="(item, index) in items" :key="index">
            <CustomFeatureCardResource :card="item" borderColor="bg-gray-400" />
          </div>
        </div>
        <div class="flex justify-center items-center text-center pt-[10vh]">
          <CustomButton variant="pricing" class="mt-3" :buttonLink="primaryButton?.link"
            :target="primaryButton?.target">
            {{ primaryButton?.text }}
          </CustomButton>
        </div>
      </div>
    </CustomSection>
  </div>
</template>

<style scoped>
.glass-card {
  border-radius: 16px;
  border-top: 1px solid var(--Glass-stroke, #fff);
  background: linear-gradient(180deg,
      rgba(1, 1, 1, 0.48) 29.9%,
      rgba(1, 1, 1, 0.8) 100%);
}

/* Selects the 6th item and moves it to the second column */
.grid>*:nth-child(6) {
  grid-column-start: 2;
}
</style>
