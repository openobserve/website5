<script setup>
import CustomImage from "./CustomImage.vue";
import CustomSection from "./CustomSection.vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  direction: {
    type: String,
    validator(value) {
      return ["left", "right"].includes(value);
    },
  },
});
</script>

<template>
  <CustomSection>
    <div
      :class="[
        'w-full flex lg:flex-row flex-col-reverse lg:flex-col-2 space-y-4 md:space-y-0 space-x-0 md:space-x-4 gap-6 justify-center items-center',
        direction === 'left' ? 'lg:flex-row-reverse' : 'lg:flex-row',
      ]"
    >
      <div class="flex flex-col space-y-3">
        <h2
          class="text-white font-inter font-bold text-xl md:text-2xl lg:text-4xl"
        >
          {{ title }}
        </h2>
        <div
          class="font-inter font-medium text-sm md:text-lg lg:text-xl text-white mb-2"
        >
          {{ description }}
        </div>
      </div>
      <div
        :class="[
          ' flex  items-center  w-full',
          direction === 'left' ? 'flex-col-reverse' : 'flex-col',
        ]"
      >
        <div class="bg-gray-700 bg-opacity-50 p-4 rounded-lg">
          <CustomImage
            v-if="image"
            :image="image"
            :altText="image"
            cssClass="w-20 h-20"
          />
        </div>
      </div>
    </div>
  </CustomSection>
</template>
