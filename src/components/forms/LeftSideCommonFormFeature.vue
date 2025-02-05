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
  <div class="md:w-1/2 p-6">
    <p class="text-white mb-6">{{ description }}</p>
    <div>
      <h3 class="text-lg font-semibold text-white mb-4">Key Features:</h3>
      <ul class="space-y-6">
        <li
          v-for="(feature, index) in keyFeatures"
          :key="index"
          class="flex flex-col gap-2"
        >
          <div class="flex items-start gap-4">
            <CustomImage
              image="/resources/Frame-11216.svg"
              altText="icon"
              cssClass="w-6 h-6"
            />
            <span class="text-white font-medium">{{ feature.title }}</span>
          </div>
          <p v-if="feature.description" class="text-gray-300 text-sm pl-10">
            {{ feature.description }}
          </p>
        </li>
      </ul>
      <h3 class="text-md font-semibold text-white py-6">
        {{ footerdescription }}
      </h3>
    </div>
  </div>
</template>
