<template>
  <div class="max-w-6xl mx-auto py-12 px-4">
    <p class="text-center text-gray-600 mb-12 max-w-3xl mx-auto">{{ description }}</p>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div>
        <div v-for="(feature, index) in features" :key="index" class="flex items-start mb-8">
          <div class="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full mr-4">
            <i class="text-2xl" :class="feature.icon"></i>
          </div>
          <div>
            <p class="text-gray-600">{{ feature.description }}</p>
          </div>
        </div>
      </div>
      <div class="bg-gray-100 p-6 rounded-lg">
        <ul class="space-y-2">
          <li v-for="(tech, index) in techList" :key="index" class="flex items-center">
            <span class="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            {{ tech }}
          </li>
        </ul>
        <div class="mt-6 flex flex-wrap gap-2">
          <span v-for="(tag, index) in techTags" :key="index" class="px-3 py-1 rounded-full text-xs font-medium"
            :class="tag.color">
            {{ tag.name }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface TechFeature {
  description: string;
  icon: string;
}

interface TechTag {
  name: string;
  color: string;
}

defineProps<{
  description: string;
  features: TechFeature[];
  techList: string[];
  techTags: TechTag[];
}>();
</script>