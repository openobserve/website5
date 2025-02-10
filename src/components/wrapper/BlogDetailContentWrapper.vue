<!-- BlogContent.vue -->
<template>
  <CustomSection>
    <div class="flex flex-col md:flex-row md:mx-auto md:gap-12">
      <!-- Rendered Markdown Content -->
      <div class="w-full md:w-[75%] text-left overflow-x-auto order-2 md:order-none">
        <div v-html="htmlContent" class="prose prose-md prose-invert max-w-none p-4"></div>
      </div>

      <!-- Table of Contents -->
      <div class="w-full md:w-[25%] order-1 md:order-none">
        <TableOfContents :headings="headings" />
      </div>
    </div>
  </CustomSection>
</template>

<script setup>
import { defineProps, ref, watch } from "vue";
import { marked } from "marked";
import TableOfContents from "./BlogDetailsTableOfContent.vue";
import CustomSection from "../core/CustomSection.vue";

const props = defineProps({
  content: {
    type: String,
    required: true,
  },
});

const htmlContent = ref("");
const headings = ref([]);

function removeFrontmatter(content) {
  return content.replace(/^(---|\+\+\+)[\s\S]+?\1/, "").trim();
}

function processMarkdown(markdownText) {
  if (!markdownText) return;

  const cleanedContent = removeFrontmatter(markdownText);
  htmlContent.value = marked(cleanedContent);

  const headingMatches = cleanedContent.match(/(##+)\s*(.*)/g) || [];
  headings.value = headingMatches.map((heading, index) => {
    const level = heading.match(/^##+/)[0].length;
    const text = heading.replace(/^##*\s*/, "").trim();
    const id = `section-${index}`;
    return { id, text, level };
  });
}

watch(() => props.content, (newContent) => {
  processMarkdown(newContent);
}, { immediate: true });

</script>
