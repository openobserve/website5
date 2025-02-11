<script setup>
import { defineProps, ref, watch, defineEmits, onMounted, nextTick } from "vue";
import { marked } from "marked";
import TableOfContents from "./BlogDetailsTableOfContent.vue";
import CustomSection from "../core/CustomSection.vue";
import { slugify } from "@/utils/slugify";

// Define props
const props = defineProps({
  content: {
    type: String,
    required: true,
  },
});

// Reactive variables
const htmlContent = ref(""); // Stores rendered markdown
const headings = ref([]);
const emit = defineEmits(["update-headings"]);
const currentSection = ref("");

/**
 * Remove frontmatter (metadata) from markdown content.
 */
function removeFrontmatter(content) {
  return content.replace(/^(---|\+\+\+)[\s\S]+?\1/, "").trim();
}

/**
 * Convert Markdown to HTML.
 */
function processMarkdown(markdownText) {
  if (!markdownText) return;

  const cleanedContent = removeFrontmatter(markdownText);
  htmlContent.value = marked(cleanedContent);
}

/**
 * Extract headings & assign IDs after HTML is rendered.
 */
async function extractHeadingsFromHTML() {
  await nextTick(); // Ensure the DOM is updated first
  if (typeof window === "undefined") return; // Avoid SSR issues
  const container = document.getElementById("blog-content");
  if (!container) return;

  headings.value = [];
  const headingElements = container.querySelectorAll("h2, h3", "h4");

  headingElements.forEach((heading, index) => {
    const level = parseInt(heading.tagName.replace("H", ""), 10);
    const text = heading.textContent.trim();
    const id = slugify(text);

    heading.setAttribute("id", id); // ✅ Assign ID to actual element
    headings.value.push({ id, text, level });
  });

  emit("update-headings", headings.value);
}
async function addCopyButtons() {
  await nextTick(); // Ensure the DOM is updated
  if (typeof window === "undefined") return; // Avoid SSR issues

  const container = document.getElementById("blog-content");
  if (!container) return;

  const addButtonToCodeBlock = (pre) => {
  if (pre.querySelector(".copy-button")) return; // Avoid duplicates

  // Ensure the code block has a relative container
  pre.style.position = "relative";

  const button = document.createElement("button");
  button.innerText = "Copy";
  button.className =
    "copy-button absolute top-2 right-2 bg-gray-800 text-white px-2 py-1 rounded-md text-sm transition-opacity opacity-100";
  button.setAttribute("aria-label", "Copy code to clipboard");
  button.tabIndex = 0;

  // Append the button
  pre.appendChild(button);

  // Handle copy logic
  button.addEventListener("click", () => {
    const code = pre.querySelector("code")?.innerText.trim();
    if (code) {
      navigator.clipboard.writeText(code);
      button.innerText = "Copied!";
      setTimeout(() => (button.innerText = "Copy"), 2000);
    }
  });

};


  // Apply buttons to existing code blocks
  container.querySelectorAll("pre").forEach(addButtonToCodeBlock);

  // Observe for dynamically added code blocks
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1 && node.tagName === "PRE") {
          addButtonToCodeBlock(node);
        }
      });
    });
  });

  observer.observe(container, { childList: true, subtree: true });
}
function observeHeadings() {
  if (typeof window === "undefined") return;

  const options = {
    root: null, // viewport
    rootMargin: "-50% 0px -50% 0px", // Trigger when heading is in the middle
    threshold: 0, // Fire when any part of the heading enters
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        currentSection.value = entry.target.id;
      }
    });
  }, options);

  const container = document.getElementById("blog-content");
  if (!container) return;

  const headingElements = container.querySelectorAll("h2, h3", "h4");
  headingElements.forEach((heading) => observer.observe(heading));
}

// Watch for content changes
watch(() => props.content, async (newContent) => {
  processMarkdown(newContent);
  await nextTick();
  extractHeadingsFromHTML();
  addCopyButtons();
  observeHeadings(); // Observe headings on content change
}, { immediate: true });

// Run once when the component mounts
onMounted(() => {
  processMarkdown(props.content);
  extractHeadingsFromHTML();
  addCopyButtons();
  observeHeadings(); // Observe headings after mount
});
</script>

<template>
  <CustomSection>
    <div class="flex flex-col md:flex-row md:mx-auto">
      <!-- Rendered Markdown Content -->
      <div id="blog-content" class="w-full md:w-[70%] text-left overflow-x-auto order-2 md:order-none">
        <div v-html="htmlContent" class="prose prose-md prose-invert prose-pre:bg-gray-800"></div>
      </div>

      <!-- Table of Contents -->
      <div class="w-full md:w-[30%] mb-8 order-1 md:order-none">
        <TableOfContents :headings="headings":activeSection="currentSection" />
      </div>
    </div>
  </CustomSection>
</template>
<style scoped>

</style>
