<script setup>
import { ref } from 'vue'
import HeadingSection from '../core/HeadingSection.vue';

const props = defineProps({
  title: String,
  description: String,
  items: {
    type: Array,
    required: true
  }
})

// Use the first item's title (or index) as key
const activeIndex = ref(0)
</script>

<template>
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <HeadingSection :title="title" :description="description" align="CENTER" />

      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Left Navigation -->
        <div class="lg:w-1/4">
          <div class="bg-[#f9fafc] rounded-lg p-4">
            <h3 class="text-lg font-semibold mb-4 px-2">Solutions</h3>
            <nav class="space-y-1">
              <button v-for="(solution, index) in items" :key="solution.id" @click="activeIndex = index" :class="[
                'w-full text-left px-4 py-3 rounded-md transition-colors cursor-pointer',
                activeIndex === index
                  ? `bg-${solution.color} text-white`
                  : 'hover:bg-gray-100 text-gray-600'
              ]">
                {{ solution.title }}
              </button>
            </nav>
          </div>
        </div>

        <!-- Solution Content -->
        <div class="lg:w-3/4">
          <div class="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
            <div class="grid md:grid-cols-2 gap-0">
              <!-- Left Column: Content -->
              <div class="p-8">
                <h3 :class="[
                  'text-2xl font-bold mb-4',
                  `text-${items[activeIndex].color}`
                ]">
                  {{ items[activeIndex].title }}
                </h3>
                <p class="text-gray-600 mb-6">
                  {{ items[activeIndex].description }}
                </p>

                <div class="space-y-4 mb-8">
                  <div v-for="(feature, idx) in items[activeIndex].features" :key="idx" class="flex items-start">
                    <svg :class="[
                      'w-5 h-5 mr-3 flex-shrink-0 mt-0.5',
                      `text-${items[activeIndex].color}`
                    ]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd" />
                    </svg>
                    <span>{{ feature }}</span>
                  </div>
                </div>

                <a :href="`/solutions/${items[activeIndex].title.replace(/\s+/g, '-').toLowerCase()}`" :class="[
                  'inline-flex items-center font-medium',
                  `text-${items[activeIndex].color}`
                ]">
                  Learn more about {{ items[activeIndex].title }}
                  <svg class="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clip-rule="evenodd" />
                  </svg>
                </a>
              </div>

              <!-- Right Column: Image -->
              <div class="relative h-full min-h-[300px] bg-gray-100">
                <img :src="items[activeIndex].image.url || '/placeholder.svg'" :alt="items[activeIndex].title"
                  class="object-contain w-full h-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
