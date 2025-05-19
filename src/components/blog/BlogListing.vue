<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div v-for="(item, index) in sectionData" :key="index">
      <BlogCard2 :blog="item" :type="type" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Blog } from "@/types/blog";
import BlogCard2 from "./BlogCard2.vue";
const props = defineProps<{
  sectionData: Blog[];
  type: string;
}>();

</script>
