<template>
  <section class="w-full">
    <h2 class="text-lg font-medium mb-2">About the Authors</h2>
    <div class="space-y-4 flex flex-col w-full">
      <a
        v-for="(authorItem, index) in author"
        :key="index"
        :href="generateAuthorLink(type, authorItem.slug)"
        class="rounded-xl border border-primary-blue/20 bg-light-gray/50 dark:bg-accent/50"
      >
        <div class="p-6">
          <div
            class="flex flex-col sm:flex-row gap-4 items-center sm:items-start"
          >
            <div
              class="w-44 rounded-full overflow-hidden border-2 border-primary-blue"
            >
              <img
                :src="authorItem.image?.url"
                :alt="authorItem.name"
                class="h-full w-full object-cover"
              />
            </div>
            <div>
              <h3 class="text-xl font-bold mb-1">{{ authorItem.name }}</h3>
              <p class="text-muted-foreground">{{ authorItem.bio }}</p>
            </div>
          </div>
        </div>
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Author } from "@/types/blog";
import { generateAuthorLink } from "@/utils/redirection";

defineProps<{
  author: Author[];
  type: string;
}>();
</script>
