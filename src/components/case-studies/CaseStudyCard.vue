<template>
  <div
    :key="item.slug"
    class="flex flex-col overflow-hidden rounded-lg shadow-md"
  >
    <!-- Dark header with logo -->
    <div
      class="bg-primary-black p-6 flex items-center justify-center h-32 relative"
    >
      <img
        :src="item.image?.url || '/placeholder.svg'"
        :alt="`${item.title} logo`"
        width="180"
        height="60"
        class="object-contain max-h-16"
      />

      <!-- Industry tag -->
      <div
        class="absolute top-3 right-3 bg-primary-blue text-white hover:bg-primary-blue/90 rounded-full px-3 py-1 text-sm font-medium"
      >
        {{ item.industry }}
      </div>
    </div>

    <!-- Content section -->

    <div class="bg-white p-6 flex-1 flex flex-col">
      <!-- Quote text -->
      <p class="text-foreground mb-4">{{ item.quote }}</p>

      <!-- Metrics -->
      <div class="space-y-2 mb-6 mt-2">
        <div
          v-for="(metric, index) in item.metrics"
          :key="index"
          class="flex items-start gap-2"
        >
          <span class="text-primary-green">✓</span>
          <span class="text-sm font-medium">{{ metric }}</span>
        </div>
      </div>
      <div class="flex items-center mt-auto mb-6">
        <div class="h-10 w-10 mr-3">
          <img
            :src="item.author.image.url"
            :alt="item.author.name"
            class="rounded-full object-cover h-full w-full"
          />
        </div>
        <div>
          <p class="font-medium text-sm">{{ item.author.name }}</p>
          <p class="text-muted-foreground text-xs">{{ item.author.role }}</p>
        </div>
      </div>
      <a
        :href="`/case-studies/${item.slug}`"
        class="text-sm font-medium w-full text-center py-2 px-4 border border-gray-200 hover:bg-gray-50 rounded-md transition-colors duration-200 ease-in-out"
        >Read Case Study</a
      >
    </div>
  </div>
</template>
<script setup lang="ts">
import type { CaseStudies } from "@/types/case-studies";
import { getInitials } from "@/utils/getInitials";
const props = defineProps({
  item: {
    type: Object as () => CaseStudies,
    required: true,
  },
});
</script>
