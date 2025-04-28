<template>
  <div class="bg-black border border-gray-800 rounded-lg p-6 flex flex-col h-full">
    <div class="mb-4">
      <div class="w-10 h-10 bg-gray-800 rounded-md flex items-center justify-center">
        <component :is="iconComponent" class="w-5 h-5 text-indigo-400" />
      </div>
    </div>
    <h3 class="text-lg font-semibold text-white mb-2">{{ option.title }}</h3>
    <p class="text-gray-400 text-sm mb-4 flex-grow">{{ option.description }}</p>
    <a
      :href="option.linkUrl"
      class="text-indigo-400 hover:text-indigo-300 text-sm font-medium inline-flex items-center group"
    >
      {{ option.linkText }}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4 ml-1 transform transition-transform group-hover:translate-x-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </a>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { MessageSquare, Github } from 'lucide-vue-next';

const props = defineProps<{
  option: {
    id: string;
    title: string;
    description: string;
    icon: string;
    linkText: string;
    linkUrl: string;
  };
}>();

const iconComponent = computed(() => {
  switch (props.option.icon) {
    case 'message-square':
      return MessageSquare;
    case 'github':
      return Github;
    default:
      return MessageSquare;
  }
});
</script>