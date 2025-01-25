<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  features: {
    type: Array,
    required: true,
    // Expected structure:
    // [
    //   {
    //     name: 'Setup Time',
    //     cloud: 'Minutes—fully managed',
    //     selfHosted: 'Flexible—depends on your infrastructure'
    //   }
    // ]
  },
  cloudTitle: {
    type: String,
    default: "Cloud",
  },
  selfHostedTitle: {
    type: String,
    default: "Self-Hosted",
  },
});
</script>

<template>
  <div class="w-full max-w-6xl mx-auto px-4 py-16">
    <!-- Title -->
    <h2 class="text-3xl md:text-4xl font-bold text-white text-center mb-12">
      {{ title }}
    </h2>

    <!-- Comparison Table -->
    <div class="bg-[#1A1A1A]/60 rounded-xl overflow-hidden backdrop-blur-sm">
      <!-- Table Header -->
      <div class="grid grid-cols-3 text-white border-b border-gray-800">
        <div class="p-4 md:p-6 font-medium text-gray-400">Feature</div>
        <div
          class="p-4 md:p-6 font-medium text-blue-400 border-x border-gray-800"
        >
          {{ cloudTitle }}
        </div>
        <div class="p-4 md:p-6 font-medium text-orange-400">
          {{ selfHostedTitle }}
        </div>
      </div>

      <!-- Table Body -->
      <div class="divide-y divide-gray-800">
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="grid grid-cols-3 text-white"
        >
          <div class="p-4 md:p-6 text-sm md:text-base text-gray-400">
            {{ feature.name }}
          </div>
          <div class="p-4 md:p-6 text-sm md:text-base border-x border-gray-800">
            {{ feature.cloud }}
          </div>
          <div class="p-4 md:p-6 text-sm md:text-base">
            {{ feature.selfHosted }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add any additional custom styles here if needed */
</style>
