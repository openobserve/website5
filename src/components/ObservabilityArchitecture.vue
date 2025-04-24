<script setup lang="ts">
import IntegrationFeatureCard from '@/components/IntegrationFeatureCard.vue'

const props = defineProps<{
  data: {
    title?: string
    description?: string
    features?: {
      section: string
      icon: string
      items: string[]
      link?: string
    }[]
    integrationFeature?: {
      title: string
      description: string
      integrations: {
        icon: string
        name: string
        description: string
      }[]
    }
  }
}>()
</script>

<template>
  <section class="relative z-10 overflow-hidden bg-white py-20 dark:bg-gray-950">
    <div class="container mx-auto px-4 text-center">
      <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
        {{ props.data?.title }}
      </h2>
      <p class="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
        {{ props.data?.description }}
      </p>

      <div
        class="mt-16 grid grid-cols-1 gap-10 md:grid-cols-3 text-left border rounded-xl p-6 shadow-md dark:border-gray-800"
      >
        <div
          v-for="(feature, index) in props.data?.features"
          :key="index"
          class="relative bg-gray-50 dark:bg-gray-900 p-6 rounded-xl flex flex-col items-start"
          :class="{
            'border border-purple-400 bg-purple-50 dark:bg-purple-950 shadow-lg':
              feature.section === 'OpenObserve Platform'
          }"
        >
          <!-- Header with Icon -->
          <h3 class="flex items-center text-lg font-semibold text-gray-900 dark:text-white mb-4">
            <img :src="feature.icon" alt="" class="h-5 w-5 mr-2" />
            {{ feature.section }}
          </h3>

          <!-- Items -->
          <ul class="space-y-2 flex-1 w-full">
            <li
              v-for="(item, idx) in feature.items"
              :key="idx"
              class="text-sm text-gray-700 dark:text-gray-400 flex items-start"
            >
              <span
                class="mr-2 h-2 w-2 rounded-full mt-1"
                :class="{
                  'bg-blue-500': feature.section === 'Data Sources',
                  'bg-green-500': feature.section === 'Insights & Actions',
                  'bg-purple-500': feature.section === 'OpenObserve Platform'
                }"
              ></span>
              {{ item }}
            </li>
          </ul>

          <!-- Arrow if link exists -->
          <div v-if="feature.link" class="mt-6 self-center">
            <a :href="feature.link" class="text-gray-500 hover:text-blue-600 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 animate-bounce"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Integration cards below -->
      <IntegrationFeatureCard
        v-if="props.data?.integrationFeature"
        :data="props.data.integrationFeature"
      />
    </div>
  </section>
</template>
