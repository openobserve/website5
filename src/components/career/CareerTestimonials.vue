<template>
  <section class="w-full" :class="background ? 'bg-gray-50' : ''">
    <CustomSection sectionClass="!py-5 lg:!py-10">
      <!-- Heading - Only show if title exists -->
      <HeadingSection
        v-if="heading?.title"
        :title="heading?.title"
        :description="heading?.description"
        align="center"
        class="!mb-12"
      />

      <!-- Testimonials Grid -->
      <div class="grid-container">
        <div 
          v-for="testimonial in items" 
          :key="testimonial?.id || testimonial?.name"
          class="p-6 rounded-lg border bg-card text-card-foreground shadow-sm space-y-4 flex flex-col justify-between grid-item w-full"
        >
          <!-- Quote -->
          <p v-if="testimonial?.quote" class="italic text-muted-foreground text-left">
            "{{ testimonial.quote }}"
          </p>
          
          <!-- Author Info -->
          <div class="flex items-center space-x-4 mt-4">
            <!-- Profile Image with fallback -->
            <div v-if="testimonial?.image?.url" class="w-12 h-12 rounded-full overflow-hidden">
              <img 
                :src="testimonial.image.url" 
                :alt="testimonial.image.alt || `${testimonial.name}'s profile`"
                class="w-12 h-12 rounded-full object-cover"
              >
            </div>
            <div v-else class="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
              <span class="text-gray-500 text-xl">
                {{ testimonial?.name?.charAt(0) || '?' }}
              </span>
            </div>
            
            <div>
              <p v-if="testimonial?.name" class="font-bold text-left">
                {{ testimonial.name }}
              </p>
              <p v-if="testimonial?.role" class="text-sm text-muted-foreground text-left">
                {{ testimonial.role }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Primary Button - Only show if text and link exist -->
      <div 
        v-if="primaryButton?.text && primaryButton?.link" 
        class="mt-12 flex justify-center"
      >
        <a 
          :href="primaryButton.link" 
          :target="primaryButton.target || '_self'"
          rel="noopener noreferrer"
        >
          <button
            class="inline-flex items-center justify-center rounded-md border border-input px-6 py-3 text-sm font-medium shadow-sm transition-colors bg-white text-primary-purple hover:bg-accent cursor-pointer"
          >
            {{ primaryButton.text }}
            <svg 
              v-if="primaryButton.target === '_blank'" 
              xmlns="http://www.w3.org/2000/svg" 
              class="h-4 w-4 ml-1" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
            </svg>
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
  id?: number;
  name?: string;
  role?: string;
  quote?: string;
  image?: {
    url?: string;
    alt?: string;
  } | null;
}

interface PrimaryButton {
  id?: number;
  text?: string;
  link?: string;
  target?: string;
  theme?: string | null;
}

defineProps<{
  heading?: {
    id?: number;
    title?: string;
    description?: string | null;
  };
  items?: Testimonial[];
  background?: boolean;
  primaryButton?: PrimaryButton;
}>();
</script>
<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(6, minmax(auto, 1fr));
  /* Adjust the number of columns */
  gap: 2rem;
  justify-content: start;
  /* Center the grid items */
  grid-auto-flow: dense;
  /* Make sure the last row fills gaps */
}

.grid-item {
  display: flex;
  justify-content: space-between;
  grid-column: span 2;
}

@media (min-width: 768px) and (max-width: 1023px) {
  .grid-container {
    grid-template-columns: repeat(4, minmax(auto, 1fr));
    /* Adjust the number of columns */
  }

  .grid-item:nth-last-child(1):nth-child(odd) {
    /* grid-column: 1 / -1; */
    grid-column-end: -2;
  }
}

@media (max-width: 767px) {
  .grid-container {
    grid-template-columns: repeat(1, minmax(auto, 1fr));
    /* Adjust the number of columns */
  }
}

@media (min-width: 1024px) {
  /* Optional: Add a counter if you need to display item numbers */
  .grid-item:last-child:nth-child(3n - 1) {
    grid-column-end: -2;
    /* Span across the last 2 columns */
  }

  .grid-item:nth-last-child(2):nth-child(3n + 1) {
    grid-column-end: 4;
    /* Span across the 4th column */
  }

  .grid-item:last-child:nth-child(3n - 2) {
    grid-column-end: 5;
    /* Span across the 5th column */
  }
}
</style>