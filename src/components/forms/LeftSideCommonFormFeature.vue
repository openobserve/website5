<script setup>
import CustomImage from "../core/CustomImage.vue";

defineProps({
  description: {
    type: String,
    required: true,
  },
  keyFeatures: {
    type: Array,
    required: true,
  },
  footerdescription: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="md:w-1/2 p-3">
    <p class="text-white mb-6 text-sm md:text-lg lg:text-xl text-center md:text-start">{{ description }}</p>
    <div>
      <ul class="space-y-6">
        <li
          v-for="(feature, index) in keyFeatures"
          :key="index"
          class="flex flex-col gap-2"
        >
          <div class="flex items-center gap-3">
            <CustomImage
              image="/resources/Frame-11216.svg"
              altText="icon"
              cssClass="w-5 md:w-6 h-5 md:h-6"
            />
            <span class="text-white font-medium">{{ feature.title }}</span>
          </div>
          <p v-if="feature.description" class="text-gray-300 text-sm pl-10">
            {{ feature.description }}
          </p>
        </li>
      </ul>
      <h3 class="font-semibold text-white py-6 text-md md:text-lg lg:text-xl text-center md:text-start">
        {{ footerdescription }}
      </h3>
    </div>
  </div>
</template>
