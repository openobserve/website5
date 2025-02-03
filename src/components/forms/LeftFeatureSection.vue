<script setup>
import CustomImage from "../core/CustomImage.vue";
import CustomSeprater from "../core/CustomSeprater.vue";

defineProps({
  description: {
    type: String,
    required: true,
  },
  keyFeatures: {
    type: Array,
    required: true,
  },
  keyFeatures2: {
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
    <div class="py-5">
      <h3 class="text-lg font-semibold text-white mb-4">Why Request a Demo?</h3>
      <ul class="space-y-4">
        <li
          v-for="(feature, index) in keyFeatures"
          :key="index"
          class="flex items-start gap-4"
        >
          <CustomImage
            image="/resources/Frame 11216.svg"
            altText="icon"
            cssClass="w-6 h-6"
          />
          <span class="text-white">{{ feature }}</span>
        </li>
      </ul>
      <h3 class="text-md font-semibold text-white py-6">
        {{ footerdescription }}
      </h3>
      <CustomSeprater />
      <h3 class="text-lg font-semibold text-white mb-4">
        What to Expect in Your Demo?
      </h3>
      <ul class="space-y-4">
        <li
          v-for="(feature, index) in keyFeatures2"
          :key="index"
          class="flex items-start gap-4"
        >
          <CustomImage
            image="/resources/Frame 11216.svg"
            altText="icon"
            cssClass="w-6 h-6"
          />
          <span class="text-white">{{ feature }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
