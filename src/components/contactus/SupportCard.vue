<template>
  <div
    class="border rounded-lg p-6 flex flex-col gap-4 h-full hover:shadow-md hover:border-primary-purple group-hover:translate-y-[-2px] transition duration-300">
    <div class="mb-2">
      <div :class="[
        'p-2 rounded-full flex items-center justify-center w-10 h-10 bg-card',
        data.theme,
      ]">
        <img v-if="props?.data?.image?.url" :src="props?.data.image?.url"
          :alt="props?.data?.image?.alternativeText" />
      </div>
    </div>
    <h3 class="text-lg lg:text-xl font-semibold">{{ data.title }}</h3>
    <p class="text-gray-400 flex-grow">{{ data.description }}</p>
    <a :href="data.button.link" class="text-indigo-400 hover:text-indigo-300 font-medium inline-flex items-center group"
      target="_blank">
      {{ data.button.text }}
      <svg xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4 ml-1 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24"
        stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </a>
  </div>
</template>

<script setup lang="ts">
import CustomImage from '../core/CustomImage.vue';

const props = defineProps<{
  data: {
    id: string;
    title: string;
    description: string;
    image: Object;
    theme: string;
    button: {
      text: string;
      link: string;
    }
  };
}>();
</script>
