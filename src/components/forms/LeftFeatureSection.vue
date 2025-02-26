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
    <div class="">
      <h3 class="text-lg md:text-xl font-semibold text-white mb-4">
        Why Request a Demo?
      </h3>
      <ul class="space-y-4">
        <li
          v-for="(feature, index) in keyFeatures"
          :key="index"
          class="flex items-start gap-4"
        >
          <img src="/img/icon/RightTick.svg" alt="icon" class="w-6 h-6" />
          <span class="text-white text-sm">{{ feature }}</span>
        </li>
      </ul>
      <h3 class="text-md font-semibold text-white py-6">
        {{ footerdescription }}
      </h3>
      <CustomSeprater />
      <h3 class="text-lg md:text-xl font-semibold text-white mb-4 pt-6">
        What to Expect in Your Demo?
      </h3>
      <ul class="space-y-4">
        <li
          v-for="(feature, index) in keyFeatures2"
          :key="index"
          class="flex items-start gap-4"
        >
          <CustomImage
            image="/img/icon/RightTick.svg"
            altText="icon"
            cssClass="w-6 h-6"
          />
          <span class="text-white text-sm">{{ feature }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
