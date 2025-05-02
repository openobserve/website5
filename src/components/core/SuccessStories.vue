<template>
  <section class="w-full py-12 md:py-24 bg-light-gray">
    <div class="container px-4 md:px-6 mx-auto">
      <div class="flex flex-col items-center justify-center space-y-4 text-center">
        <div class="space-y-2">
          <HeadingSection :title="sectionTitle" :subtitle="sectionDescription" />
        </div>
      </div>

      <div class="mx-auto grid gap-8 py-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <!-- Success Story Cards -->
        <div v-for="(story, storyIndex) in stories" :key="story.id"
          class="flex flex-col h-full justify-between rounded-lg border bg-card p-6 shadow-sm w-full mx-auto">
          <div class="flex flex-col flex-grow">
            <!-- Tags -->
            <div class="flex flex-wrap gap-2 mb-4">
              <span v-for="(tag, tagIndex) in story.tags" :key="tagIndex" :class="getTagColorByName(tag)"
                class="rounded-full px-3 py-1 text-xs">
                {{ tag }}
              </span>
            </div>

            <!-- Logo -->
            <div class="mb-4">
              <img :src="story.logo" width="120" height="40" :alt="story.logoAlt" class="h-10 object-contain" />
            </div>

            <!-- Title -->
            <h3 class="text-lg font-semibold mb-3">{{ story.title }}</h3>

            <!-- Benefits List -->
            <ul class="mb-4 space-y-2 mt-auto">
              <li v-for="(benefit, index) in story.benefits" :key="index" class="flex items-start gap-2">
                <CheckCircle class="h-5 w-5 text-primary-green mt-0.5 flex-shrink-0" />
                <span class="text-sm">{{ benefit }}</span>
              </li>
            </ul>

            <!-- Description -->
            <p class="mt-auto text-muted-foreground mb-6 line-clamp-3">
              {{ story.description }}
            </p>
          </div>

          <!-- Button -->
          <div class="pt-4">
            <button
              class="inline-flex items-center justify-center rounded-md bg-primary-purple px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-dark-purple cursor-pointer">
              {{ story.buttonText }}
            </button>
          </div>
        </div>
      </div>

      <!-- View All Button -->
      <div class="mt-8 flex justify-center">
        <button
          class="inline-flex items-center justify-center rounded-md border border-input px-6 py-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer">
          {{ viewAllText }}
          <ArrowRight class="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { CheckCircle, ArrowRight } from 'lucide-vue-next'
import HeadingSection from '@/components/core/HeadingSection.vue'

type Story = {
  id: number
  tags: string[]
  logo: string
  logoAlt: string
  title: string
  benefits: string[]
  description: string
  buttonText: string
}

const props = defineProps<{
  sectionTitle: string
  sectionDescription: string
  stories: Story[]
  viewAllText?: string
}>()

function getTagColorByName(tag: string) {
  // Example tag color logic
  const tagColors: Record<string, string> = {
    Technology: 'bg-blue-100 text-blue-800',
    'Microservices': 'bg-green-100 text-green-800',
    'Financial Services': 'bg-yellow-100 text-yellow-800',
    'Cloud Migration': 'bg-purple-100 text-purple-800',
    'E-Commerce': 'bg-pink-100 text-pink-800',
    'Peak Season': 'bg-red-100 text-red-800'
  }

  return tagColors[tag] || 'bg-gray-100 text-gray-800'
}
</script>

<style scoped>
.bg-light-gray {
  background-color: #f8f9fa;
}

.text-muted-foreground {
  color: #6b7280;
}

.bg-card {
  background-color: #ffffff;
}

.border {
  border-color: #e5e7eb;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.text-primary-purple {
  color: #7c3aed;
}

.bg-primary-purple {
  background-color: #7c3aed;
}

.bg-dark-purple {
  background-color: #5b21b6;
}

.text-primary-green {
  color: #10b981;
}
</style>
