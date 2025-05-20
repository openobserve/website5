<template>
  <section class="w-full" :class="background ? 'bg-gray-50' : ''">
    <CustomSection>
      <!-- Heading -->
      <HeadingSection
          v-if="title || description"
          :title="title"
          :description="description"
          align="center"
          class="!mb-12"
        />

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

       <div class="mt-12 flex justify-center">
        <a :href="button.link" :target="button.target|| '_self'">
          <button
            class="inline-flex items-center justify-center rounded-md border border-input px-6 py-3 text-sm font-medium shadow-sm transition-colors bg-white text-primary-purple hover:bg-accent  cursor-pointer"
          >
            {{ button.text }}
          </button>
        </a>
      </div>
    </CustomSection>
  </section>
</template>

<script setup lang="ts">
import HeadingSection from "../core/HeadingSection.vue";
import CustomSection from "../core/CustomSection.vue";
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
  button:{
    text: string;
    link: string;
    target?: string;
  };
}>();
</script>