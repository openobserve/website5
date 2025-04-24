<script setup lang="ts">
const props = defineProps<{
  data: {
    title: string
    description: string
    icon: string
    link?: string
    color?: string
    bg?: string
  }[]
}>()
</script>

<template>
  <section class="py-20 bg-light-gray">
    <div class="container">
      <div class="grid gap-8 lg:grid-cols-3">
        <div
          v-for="(item, index) in props.data"
          :key="index"
          class="rounded-xl p-6 shadow-lg flex flex-col items-center text-center"
          :class="item.bg"
        >
          <!-- Icon -->
          <div class="mb-4" :class="item.color">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              v-html="item.icon"
            />
          </div>

          <!-- Title -->
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white">
            {{ item.title }}
          </h3>

          <!-- Description -->
          <p class="mt-2 text-gray-600 dark:text-gray-400 text-sm">
            {{ item.description }}
          </p>

          <!-- Optional Arrow Link -->
          <div v-if="item.link" class="mt-4">
            <a
              :href="item.link"
              class="text-gray-500 hover:text-blue-600 transition inline-block"
              aria-label="Learn more"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
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
    </div>
  </section>
</template>
