<script setup>
import { computed } from "vue";
import CustomImage from "./CustomImage.vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  direction: {
    type: String,
    default: "left",
    validator(value) {
      return ["left", "right"].includes(value);
    },
  },
});

const sectionClasses = computed(() => ({
  "md:flex-row-reverse": props.direction === "right",
}));
</script>

<template>
  <div
    :class="[
      'w-full flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 space-x-0 md:space-x-4 gap-6 pt-10 relative',
      sectionClasses,
    ]"
  >
    <div class="relative w-full md:w-1/2">
      <!-- Background Image with Lower z-index -->
      <div
        class="absolute inset-0 bg-cover bg-center rounded-lg z-0"
        :style="{ backgroundImage: `url('/background/featureBG.svg')` }"
      ></div>

      <!-- Foreground Image -->
      <div class="relative w-full h-auto rounded-lg shadow-md p-3 z-10">
        <CustomImage
          :image="image"
          :altText="title"
          cssClass="w-full h-auto rounded-lg shadow-md"
        />
      </div>
    </div>
    <div class="w-full md:w-1/2 z-10">
      <h2
        class="text-[#f4f4f5] mb-4 font-inter font-semibold text-xl md:text-2xl lg:text-4xl"
      >
        {{ title }}
      </h2>
      <div v-if="items?.length">
        <div v-for="(item, index) in items" :key="index" class="mb-4">
          <h3
            class="font-inter font-semibold text-sm md:text-base lg:text-lg text-white mb-2"
          >
            {{ item.title }}
          </h3>
          <p class="font-inter text-sm text-gray-300 mb-2">
            {{ item.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
