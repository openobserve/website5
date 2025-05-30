<script setup>
import { ref } from "vue";
import HeadingSection from "../core/HeadingSection.vue";
import CustomSection from "../core/CustomSection.vue";
import { Check } from "lucide-vue-next";

const props = defineProps({
  heading:{
    type: Object,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  background: {
    type: Boolean,
    required: false,
  },
});

// Use the first item's title (or index) as key
const activeIndex = ref(0);
</script>

<template>
  <section class="" :class="background ? 'bg-gray-50' : ''">
    <CustomSection sectionClass="mb-2">
      <HeadingSection :title="heading?.title" :description="heading?.description" align="CENTER" />

      <div :class="[
        'flex flex-col lg:flex-row gap-8',
        props?.items?.[activeIndex]?.theme,
      ]">
        <!-- Left Navigation -->
        <div class="lg:w-1/4">
          <div class="bg-[#f9fafc] rounded-lg p-4">
            <p class="text-lg font-semibold mb-4 px-2 text-black">Solutions</p>
            <nav class="space-y-1">
              <button v-for="(solution, index) in items" :key="solution?.title" @click="activeIndex = index" :class="[
                'w-full text-left px-4 py-3 rounded-md transition-colors cursor-pointer',
                activeIndex === index
                  ? 'bg-tabs-background text-white'
                  : 'hover:bg-gray-100 text-gray-600',
              ]">
                <h2>
                  {{ solution?.title }}
                </h2>
              </button>
            </nav>
          </div>
        </div>

        <!-- Solution Content -->
        <div class="lg:w-3/4" :key="activeIndex">
          <div class="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
            <div class="grid md:grid-cols-2 gap-0">
              <!-- Left Column: Content -->
              <div class="p-8">
                <h2 :class="['text-2xl font-bold mb-4', 'text-tabs-title-text']">
                  {{ items?.[activeIndex]?.title }}
                </h2>
                <p class="text-gray-600 mb-6">
                  {{ items?.[activeIndex]?.description }}
                </p>

                <div class="space-y-4 mb-8">
                  <div v-for="(feature, idx) in items?.[activeIndex]?.items" :key="feature?.title"
                    class="flex items-start text-black">
                    <Check
                      class="rounded-full p-1 w-5 h-5 mr-3 flex-shrink-0 mt-0.5 bg-tabs-background/20 text-tabs-title-text" />
                    <span>{{ feature?.title }}</span>
                  </div>
                </div>

                <a :href="items?.[activeIndex]?.primaryButton?.link" :class="[
                  'inline-flex items-center font-medium',
                  'text-tabs-title-text',
                ]">
                  Learn more about {{ items?.[activeIndex]?.title }}
                  <svg class="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clip-rule="evenodd" />
                  </svg>
                </a>
              </div>

              <!-- Right Column: Image -->
              <div class="h-full min-h-[300px] bg-gray-100 flex items-center justify-center">
                <img :src="items?.[activeIndex]?.image?.url || '/placeholder.svg'" :alt="items?.[activeIndex]?.title"
                  class="object-contain max-w-full max-h-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </CustomSection>
  </section>
</template>