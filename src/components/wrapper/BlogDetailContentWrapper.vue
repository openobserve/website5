<script setup>
import { defineProps, ref, watch, defineEmits } from "vue";
import { marked } from "marked";
import TableOfContents from "./BlogDetailsTableOfContent.vue";
import CustomSection from "../core/CustomSection.vue";

// Define props
const props = defineProps({
  content: {
    type: String,
    required: true,
  },
});

// Reactive variables
const htmlContent = ref(""); // For rendered markdown
const headings = ref([]);
const emit = defineEmits(["update-headings"]);

/**
 * Remove frontmatter between --- or +++ delimiters from a Markdown string.
 * @param {string} content - Markdown content
 * @returns {string} Content without frontmatter
 */
function removeFrontmatter(content) {
  return content.replace(/^(---|\+\+\+)[\s\S]+?\1/, "").trim();
}

/**
 * Process Markdown content: convert to HTML and extract headings.
 * @param {string} markdownText
 */
function processMarkdown(markdownText) {
  if (!markdownText) return;

  // Remove frontmatter before processing
  const cleanedContent = removeFrontmatter(markdownText);

  // Convert Markdown to HTML
  htmlContent.value = marked(cleanedContent);

  // Extract headings for Table of Contents
  const headingMatches = cleanedContent.match(/(##+)\s*(.*)/g) || [];
  headings.value = headingMatches.map((heading, index) => {
    const level = heading.match(/^##+/)[0].length;
    const text = heading.replace(/^##*\s*/, "").trim();
    const id = `section-${index}`;

    return { id, text, level };
  });

  // Emit the headings to the parent component for ToC
  emit("update-headings", headings.value);
}

// Watch for content prop changes and update accordingly
watch(() => props.content, (newContent) => {
  processMarkdown(newContent);
}, { immediate: true });

/**
 * Scroll to a specific section when TOC is clicked.
 * @param {string} id - The ID of the section
 */

</script>

<template>
  <CustomSection>
    <div class="flex flex-col md:flex-row md:mx-auto md:gap-12">
      <!-- Rendered Markdown Content -->
      <div class="w-full md:w-[75%] text-left overflow-x-auto order-2  md:order-none">
        <div v-html="htmlContent" class="prose prose-md prose-invert max-w-none p-4"></div>
      </div>

      <!-- Table of Contents -->
      <div class="w-full md:w-[25%] order-1 md:order-none">
        {{ console.log(headings, "headings") }}
        <TableOfContents :headings="headings" @hover-heading="scrollToSection" />
      </div>
    </div>
  </CustomSection>
</template>
