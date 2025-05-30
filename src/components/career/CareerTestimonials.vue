<template>
  <section class="w-full" :class="background ? 'bg-gray-50' : ''">
    <CustomSection sectionClass="!py-5 lg:!py-10">
      <!-- Heading -->
      <HeadingSection
          v-if="heading?.title || heading?.description"
          :title="heading.title"
          :description="heading.description"
          align="center"
          class="!mb-12"
        />

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="(testimonial, index) in items" :key="index"
          class="p-6 rounded-lg border bg-card text-card-foreground shadow-sm space-y-4 flex flex-col justify-between">
          <p class="italic text-muted-foreground text-left">"{{ testimonial.quote }}"</p>
          <div class="flex items-center space-x-4 mt-4">
            <div class="w-12 h-12 rounded-full overflow-hidden">
              <img :src="testimonial.image.url" :alt="testimonial.image.alt" class="w-12 h-12 rounded-full object-cover">
            </div>
            <div>
              <p class="font-bold text-left">{{ testimonial.name }}</p>
              <p class="text-sm text-muted-foreground text-left">{{ testimonial.role }}</p>
            </div>
          </div>
        </div>
      </div>

       <div class="mt-12 flex justify-center">
        <a :href="primaryButton.link" :target="primaryButton.target|| '_self'">
          <button
            class="inline-flex items-center justify-center rounded-md border border-input px-6 py-3 text-sm font-medium shadow-sm transition-colors bg-white text-primary-purple hover:bg-accent  cursor-pointer"
          >
            {{ primaryButton.text }}
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
  image?: Object;
}

defineProps<{
  heading: {
    title: string;
    description: string;
  },
  items: Testimonial[];
  background?: boolean;
  primaryButton:{
    text: string;
    link: string;
    target?: string;
  };
}>();
</script>