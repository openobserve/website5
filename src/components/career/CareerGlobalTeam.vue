<template>
  <div class="bg-gray-950 text-white py-16 px-4">
    <div class="max-w-6xl mx-auto">
      <h2 class="text-2xl md:text-3xl font-bold text-center mb-2">{{ title }}</h2>
      <p class="text-center text-gray-300 mb-12 max-w-3xl mx-auto">{{ description }}</p>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="(feature, index) in features" :key="index" class="text-center">
          <div class="flex justify-center mb-4">
            <div class="w-12 h-12 flex items-center justify-center">
              <i class="text-2xl" :class="feature.icon"></i>
            </div>
          </div>
          <h3 class="text-xl font-bold mb-2">{{ feature.title }}</h3>
          <p class="text-gray-300">{{ feature.description }}</p>
        </div>
      </div>

      <div class="bg-gray-900 rounded-lg p-6 mt-12">
        <div class="h-64 relative">
          <div class="absolute inset-0 flex items-center justify-center">
            <p class="text-center text-gray-300">{{ mapText }}</p>
          </div>
          <div class="absolute inset-0 flex items-center justify-center">
            <div v-for="(dot, index) in mapDots" :key="index" class="w-3 h-3 rounded-full absolute" :class="dot.color"
              :style="{ left: dot.x + '%', top: dot.y + '%' }">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface GlobalTeamFeature {
  title: string;
  description: string;
  icon: string;
}

interface MapDot {
  x: number;
  y: number;
  color: string;
}

defineProps<{
  title: string;
  description: string;
  features: GlobalTeamFeature[];
  mapText: string;
  mapDots: MapDot[];
}>();
</script>