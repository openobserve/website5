<script setup>
import { defineProps, ref, watch, defineEmits, onMounted, nextTick } from "vue";
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
const htmlContent = ref(""); // Stores rendered markdown
const headings = ref([]);
const emit = defineEmits(["update-headings"]);

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

  const container = document.getElementById("blog-content");
  if (!container) return;

  headings.value = [];
  const headingElements = container.querySelectorAll("h2, h3");

  headingElements.forEach((heading, index) => {
    const level = parseInt(heading.tagName.replace("H", ""), 10);
    const text = heading.textContent.trim();
    const id = `section-${index}`;

    heading.setAttribute("id", id); // ✅ Assign ID to actual element
    headings.value.push({ id, text, level });
  });

  emit("update-headings", headings.value);
}

/**
 * Scroll to section smoothly.
 */
const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    const yOffset = -80; // Adjust for sticky navbar
    const y = element.getBoundingClientRect().top + window.scrollY + yOffset;

    window.scrollTo({ top: y, behavior: "smooth" });

    // Highlight section temporarily
    element.classList.add("bg-yellow-500", "text-black", "p-2", "rounded-lg");
    setTimeout(() => {
      element.classList.remove("bg-yellow-500", "text-black", "p-2", "rounded-lg");
    }, 2000);
  }
};

async function addCopyButtons() {
  await nextTick(); // Ensure the DOM is updated

  const container = document.getElementById("blog-content");
  if (!container) return;

  const codeBlocks = container.querySelectorAll("pre");

  codeBlocks.forEach((pre) => {
    if (pre.querySelector(".copy-button")) return; // Avoid duplicates

    const button = document.createElement("button");
    button.innerText = "Copy";
    button.className = "copy-button absolute top-2 right-2 bg-gray-800 text-white px-2 py-1 rounded-md text-sm";
    
    pre.style.position = "relative"; // Ensure the button is positioned correctly
    pre.appendChild(button);

    button.addEventListener("click", () => {
      const code = pre.querySelector("code")?.innerText;
      if (code) {
        navigator.clipboard.writeText(code);
        button.innerText = "Copied!";
        setTimeout(() => (button.innerText = "Copy"), 2000);
      }
    });
  });
}

// Watch for content changes
watch(() => props.content, async (newContent) => {
  processMarkdown(newContent);
  await nextTick();
  extractHeadingsFromHTML();
  addCopyButtons();
}, { immediate: true });

// Run once when the component mounts
onMounted(() => {
  processMarkdown(props.content);
  extractHeadingsFromHTML();
  addCopyButtons();
});
</script>

<template>
  <CustomSection>
    <div class="flex flex-col md:flex-row md:mx-auto">
      <!-- Rendered Markdown Content -->
      <div id="blog-content" class="w-full md:w-[70%] text-left overflow-x-auto order-2 md:order-none">
        <div v-html="htmlContent" class="prose prose-md prose-invert"></div>
      </div>

      <!-- Table of Contents -->
      <div class="w-full md:w-[30%] mb-8 order-1 md:order-none">
        <TableOfContents :headings="headings" @scroll-to="scrollToSection" />
      </div>
    </div>
  </CustomSection>
</template>
