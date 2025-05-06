<template>
  <section class="w-full py-12 md:py-14" :class="background ? 'bg-gray-50' : ''">
    <div class="container mx-auto py-16 px-4 md:px-6">
      <div class="flex flex-col items-center space-y-4 mb-10 text-center">
        <h2 class="text-3xl font-bold tracking-tighter sm:text-4xl">{{ title }}</h2>
        <p class="mx-auto max-w-[700px] text-muted-foreground ">
          {{ description }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="(testimonial, index) in items" :key="index"
          class="p-6 rounded-lg border bg-card text-card-foreground shadow-sm space-y-4 flex flex-col justify-between">
          <p class="italic text-muted-foreground text-left">"{{ testimonial.quote }}"</p>
          <div class="flex items-center space-x-4 mt-4">
            <div class="w-12 h-12 rounded-full overflow-hidden">
              <img :src="testimonial.avatar" :alt="testimonial.name" class="w-12 h-12 rounded-full object-cover">
            </div>
            <div>
              <p class="font-bold text-left">{{ testimonial.name }}</p>
              <p class="text-sm text-muted-foreground text-left">{{ testimonial.role }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
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
  background?: boolean;
}>();
</script>