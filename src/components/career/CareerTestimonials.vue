<template>
  <div class="bg-light-gray">
    <div class="container mx-auto py-16 px-4 ">
      <div class="flex flex-col items-center space-y-4 text-center mb-10">
        <h2 class="text-3xl font-bold tracking-tighter sm:text-4xl">{{ title }}</h2>
        <p class="mx-auto max-w-[700px] text-muted-foreground">
          {{ description }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="(testimonial, index) in items" :key="index"
          class="p-6 rounded-lg border bg-card text-card-foreground shadow-sm space-y-4">
          <p class="italic text-muted-foreground ">"{{ testimonial.quote }}"</p>
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