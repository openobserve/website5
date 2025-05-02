<template>
  <div class="flex flex-wrap gap-2">
    <a
      href="#"
      class="px-3 py-1 text-sm border rounded-full hover:bg-primary-purple/10 hover:text-primary-purple cursor-pointer"
    >
      All Industries
    </a>
    <a
      v-for="it in tags"
      :key="it.slug"
      :href="`/tag/${it.slug}`"
      class="px-3 py-1 text-sm border rounded-full hover:bg-primary-purple/10 hover:text-primary-purple cursor-pointer"
    >
      {{ it.name }}
    </a>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  tags: {
    name: string
    slug: string
  }[]
}>()
</script>
