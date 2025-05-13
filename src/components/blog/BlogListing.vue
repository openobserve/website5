<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div v-for="(item, index) in sectionData" :key="index">
      <BlogCard2 :blog="item" :type="type" :authors="getAuthorsForBlog(item)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Blog } from "@/types/blog";
import BlogCard2 from "./BlogCard2.vue";
import { getAuthorDetails } from "@/utils/api/blog";
import { ref, onMounted, toRaw } from "vue";
const props = defineProps<{
  sectionData: Blog[];
  type: string;
}>();

const authorsMap = ref<Record<string, any>>({});
const authorDetails = ref<Record<string, any>>({});
onMounted(async () => {
  const slugsSet = new Set<string>();

  // Collect unique slugs
  props.sectionData.forEach((blog) => {
    blog.authors?.forEach((author) => {
      if (author.slug) slugsSet.add(author.slug);
    });
  });

  const uniqueSlugs = Array.from(slugsSet);

  // Fetch details in parallel
  const authorDetailsArray = await Promise.all(
    uniqueSlugs.map((slug) => getAuthorDetails(slug))
  );

  // Convert array to map for quick lookup
  authorsMap.value = Object.fromEntries(
    authorDetailsArray.map((author) => [author.slug, author])
  );

  // If you need the plain object, you can access it like this
  const authorDetails = toRaw(authorsMap.value);
});

// This makes author mapping reactive
function getAuthorsForBlog(blog: Blog) {
  return (
    blog.authors
      ?.map((author) => authorsMap.value[author.slug])
      .filter(Boolean) || []
  );
}
</script>
