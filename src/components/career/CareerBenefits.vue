<template>
  <div class="max-w-6xl mx-auto px-4 py-8">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="(benefit, index) in benefits" :key="index" class="bg-gray-900 text-white p-6 rounded-lg">
        <div class="flex justify-center mb-4">
          <div class="w-12 h-12 flex items-center justify-center rounded-full" :class="benefit.iconColor">
            <i class="text-2xl" :class="benefit.icon"></i>
          </div>
        </div>
        <h3 class="text-xl font-bold mb-2">{{ benefit.title }}</h3>
        <p class="text-gray-300">{{ benefit.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Benefit {
  title: string;
  description: string;
  icon: string;
  iconColor: string;
}

defineProps<{
  benefits: Benefit[];
}>();
</script>