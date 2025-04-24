<script setup lang="ts">
const props = defineProps<{
  data: {
    title?: string
    description?: string
    integrations: {
      icon: string
      name: string
      description: string
    }[]
  }
}>()
</script>

<template>
  <div class="mt-20 text-center">
    <h3 class="text-2xl font-bold text-gray-900 dark:text-white">
      {{ props.data?.title }}
    </h3>
    <p class="mt-2 text-gray-600 dark:text-gray-400">{{ props.data?.description }}</p>
    <div class="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6">
      <div
        v-for="(item, index) in props.data?.integrations"
        :key="index"
        class="flex flex-col items-center text-center"
      >
        <img :src="item.icon" :alt="item.name" class="h-12 w-12 mb-2" />
        <h4 class="font-semibold text-gray-800 dark:text-white">{{ item.name }}</h4>
        <p class="text-sm text-gray-500 dark:text-gray-400">{{ item.description }}</p>
      </div>
    </div>
  </div>
</template>
