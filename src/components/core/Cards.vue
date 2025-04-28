<script setup lang="ts">
import CustomButton from "./CustomButton.vue";
import CustomSection from "./CustomSection.vue";

const props = defineProps<{
  data: {
    title: string;
    description: string;
    icon: string;
    buttonText?: string;
    buttonLink?: string;
  }[];
}>();
</script>

<template>
  <CustomSection>
    <div class="grid gap-8 lg:grid-cols-3">
      <div
        v-for="(item, index) in props.data"
        :key="index"
        class="rounded-xl p-6 flex flex-col items-left text-left border border-gray-300"
      >
        <!-- Icon -->
        <div
          :class="['p-2 rounded-full mb-4 flex items-center justify-center w-10 h-10 ', item.title.replace(/\s+/g, '_').toLocaleLowerCase() || 'bg-blue-400/80 text-white']"
        >
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
        <p class="my-4 text-gray-600 dark:text-gray-400 text-sm">
          {{ item.description }}
        </p>

        <!-- Optional Arrow Link -->
        <div v-if="item.buttonLink" class="mt-auto w-1/2">
          <CustomButton
            size="small"
            :buttonText="item.buttonText"
            :buttonLink="item.buttonLink"
            :btn-class="item.title.replace(/\s+/g, '_').toLocaleLowerCase()"
          />
        </div>
      </div>
    </div>
  </CustomSection>
</template>
