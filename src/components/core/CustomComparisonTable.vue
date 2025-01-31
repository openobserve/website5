<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  features: {
    type: Array,
    required: true,
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
    <div
      class="rounded-xl overflow-hidden backdrop-blur-sm bg-cover bg-center bg-no-repeat bg-[url('/download-pricing/Eclipse.svg'),url('/download-pricing/Eclipse(1).svg'),url('/download-pricing/Eclipse(2).svg')]"
    >
      <!-- Table Header -->
      <div class="grid grid-cols-3 text-white border-b border-gray-800">
        <!-- Feature Column -->
        <div class="p-4 md:p-6 font-medium text-gray-400">Feature</div>

        <!-- Cloud Column -->
        <div
          class="p-4 md:p-6 font-medium text-blue-400 border-x border-gray-800"
        >
          {{ cloudTitle }}
        </div>

        <!-- Self-Hosted Column -->
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
          <!-- Feature Column -->
          <div class="p-4 md:p-6 text-sm md:text-base text-gray-400">
            {{ feature.name }}
          </div>

          <!-- Cloud Column -->
          <div class="p-4 md:p-6 text-sm md:text-base border-x border-gray-800">
            {{ feature.cloud }}
          </div>

          <!-- Self-Hosted Column -->
          <div class="p-4 md:p-6 text-sm md:text-base">
            {{ feature.selfHosted }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
