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
import { getAuthorDetails } from "@/utils/api/blog";
import { ref, onMounted, toRaw } from "vue";
const props = defineProps<{
  sectionData: Blog[];
  type: string;
}>();

// const authorsMap = ref<Record<string, any>>({});
// onMounted(async () => {
//   authorsMap.value = await fetchAuthorsMapFromBlogs(props.sectionData);
// });

// // This makes author mapping reactive
// function getAuthorsForBlog(blog: Blog) {
//   return (
//     blog.authors
//       ?.map((author) => authorsMap.value[author.slug])
//       .filter(Boolean) || []
//   );
// }
</script>
