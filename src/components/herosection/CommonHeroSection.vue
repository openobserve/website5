<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  align: {
    type: String as () => 'left' | 'center' | 'right',
    default: 'left',
  },
})
</script>

<template>

  <div class="w-full bg-gradient-to-r from-indigo-400 to-blue-400 py-20 px-5">
    <div
      class="max-w-full mx-auto flex flex-col"
      :class="{
        'items-start text-left': align === 'left',
        'items-center text-center': align === 'center',
        'items-end text-right': align === 'right'
      }"
    >
      <h1 class="text-5xl font-bold text-white mb-4">
        {{ title }}
      </h1>
      <p class="text-white text-lg">
        {{ description }}
      </p>
    </div>
  </div>

</template>
