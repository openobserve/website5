<script setup>
import { defineProps, ref, onMounted , defineEmits} from "vue";
import { marked } from "marked"; // Use Marked.js to convert Markdown to HTML
import TableOfContents from "./BlogDetailsTableOfContent.vue";
import CustomSection from "../core/CustomSection.vue";

// Define props
defineProps({
  title: {
    type: String,
    required: true,
  },
  bottomImage: {
    type: String,
  },
  activity: {
    type: Array || null,
  },
  suggestions: {
    type: Array || null,
  },
});

// Reactive variables
const markdownContent = ref("");
const htmlContent = ref(""); // For rendered markdown
const headings = ref([]);
const emit = defineEmits(["update-headings"]);

/**
 * Remove frontmatter between --- or +++ delimiters from a Markdown string.
 * @param {string} content - Markdown content
 * @returns {string} Content without frontmatter
 */
function removeFrontmatter(content) {
  // Remove frontmatter between --- or +++ delimiters
  return content.replace(/^(---|\+\+\+)[\s\S]+?\1/, '').trim();
}


// Fetch the markdown file from the public folder
onMounted(async () => {
  try {
    const response = await fetch("/example.md");
    const rawContent = await response.text();
    
    // Remove frontmatter before processing
    markdownContent.value = removeFrontmatter(rawContent);

    // Convert Markdown to HTML
    htmlContent.value = marked(markdownContent.value);

    // Extract headings for Table of Contents
    const headingMatches = markdownContent.value.match(/(##+)\s*(.*)/g) || [];
    headings.value = headingMatches.map((heading, index) => {
      const level = heading.match(/^##+/)[0].length;
      const text = heading.replace(/^##*\s*/, "");
      const id = `section-${index}`;

      return { id, text, level };
    });

    // Emit the headings to the parent component for ToC
    emit("update-headings", headings.value);
  } catch (error) {
    console.error('Error loading or processing markdown:', error);
  }
});
const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
    element.classList.add("bg-yellow-500", "text-black", "p-2", "rounded-lg");

    setTimeout(() => {
      element.classList.remove("bg-yellow-500", "text-black", "p-2", "rounded-lg");
    }, 2000);
  }
};
</script>

<template>
  <CustomSection>
    <div class="flex flex-col md:flex-row md:mx-auto">
      <!-- Table of Contents (Above content on Mobile, Sidebar on Desktop) -->
    
      <!-- Rendered Markdown Content -->
      <div class="w-full text-left overflow-x-auto order-2 md:order-none">
        <div v-html="htmlContent" class="prose prose-md prose-invert"></div>
      </div>
      <div class="w-full md:w-[30%]  mb-8 order-1 md:order-none">
        <TableOfContents :headings="headings" @hover-heading="scrollToSection" />
      </div>
    </div>
  </CustomSection>
</template>
