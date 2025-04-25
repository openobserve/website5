<template>
  <div class="max-w-6xl mx-auto py-16 px-4">
    <h2 class="text-2xl md:text-3xl font-bold text-center mb-2">{{ title }}</h2>
    <p class="text-center text-gray-600 mb-12 max-w-3xl mx-auto">{{ description }}</p>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div v-for="(testimonial, index) in items" :key="index" class="bg-gray-900 text-white p-6 rounded-lg">
        <p class="italic mb-6">"{{ testimonial.quote }}"</p>
        <div class="flex items-center">
          <div class="w-12 h-12 rounded-full overflow-hidden bg-gray-600 mr-4">
            <img v-if="testimonial.avatar" :src="testimonial.avatar" :alt="testimonial.name"
              class="w-full h-full object-cover">
          </div>
          <div>
            <p class="font-bold">{{ testimonial.name }}</p>
            <p class="text-gray-300 text-sm">{{ testimonial.role }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatar?: string;
}

defineProps<{
  title: string;
  description: string;
  items: Testimonial[];
}>();
</script>