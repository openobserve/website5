<script setup>
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
  <div class="md:w-1/2">
    <p class="text-white mb-6">{{ description }}</p>
    <div>
      <h3 class="text-lg font-semibold text-white mb-4">Key Features:</h3>
      <ul class="space-y-4">
        <li
          v-for="(feature, index) in keyFeatures"
          :key="index"
          class="flex items-start gap-4"
        >
          <img src="/resources/Frame-11216.svg" alt="icon" class="w-6 h-6" />
          <span class="text-white">{{ feature }}</span>
        </li>
      </ul>
      <h3 class="text-md font-semibold text-white py-6">
        {{ footerdescription }}
      </h3>
    </div>
  </div>
</template>
