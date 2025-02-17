<script setup>
import { defineProps, ref, watch, defineEmits, onMounted, nextTick } from "vue";
import { marked } from "marked";
import TableOfContents from "./BlogDetailsTableOfContent.vue";
import CustomSection from "../core/CustomSection.vue";
import { slugify } from "@/utils/slugify";
import SingleAuthorDetails from "../blogs/SingleAuthorDetails.vue";

// Define props
const props = defineProps({
  content: {
    type: String,
    required: true,
  },
  authors : {
    type: Array,
    required: true
  }
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
async function processMarkdown(markdownText) {
  if (!markdownText) return;

  const cleanedContent = removeFrontmatter(markdownText);
  htmlContent.value = marked(cleanedContent);

  await nextTick();
  extractHeadingsFromHTML();
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
    if (pre.parentElement.classList.contains("code-container")) return; // Avoid duplicates

    // Wrap pre inside a div to position the button separately
    const wrapper = document.createElement("div");
    wrapper.className = "code-container relative";
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);

    // Create copy button
    const button = document.createElement("button");
    button.innerHTML = `<img src="/download-pricing/copyIcon.svg" alt="Plus Icon" />`;
    button.className =
      "copy-button absolute top-0 right-0  px-0  rounded-md text-sm transition-opacity opacity-100";
    button.setAttribute("aria-label", "Copy code to clipboard");
    button.tabIndex = 0;
    button.style.position = "absolute";
    button.style.top = "-20px"; // Adjust this value as needed
    button.style.right = "20px";

    // Append button to wrapper (not inside <pre>)
    wrapper.appendChild(button);

    // Handle copy logic
    button.addEventListener("click", () => {
      const code = pre.querySelector("code")?.innerText.trim();
      if (code) {
        navigator.clipboard.writeText(code);
        button.innerHTML = `<img src="/download-pricing/copiedIcon.svg" alt="Plus Icon" class="h-5 w-5" />`;
        setTimeout(
          () =>
            (button.innerHTML = `<img src="/download-pricing/copyIcon.svg" alt="Plus Icon" />`),
          2000
        );
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
    root: null, // Use the viewport
    rootMargin: "-20% 0px -70% 0px", // Adjust visibility trigger zones
    threshold: [0.1, 0.5, 0.9], // Multiple thresholds to track entry more accurately
  };

  const observer = new IntersectionObserver((entries) => {
    let visibleSections = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio); // Sort by most visible

    if (visibleSections.length > 0) {
      currentSection.value = visibleSections[0].target.id;
    }
  }, options);

  const container = document.getElementById("blog-content");
  if (!container) return;

  const headingElements = container.querySelectorAll("h2, h3", "h4");
  headingElements.forEach((heading) => observer.observe(heading));
}

// Watch for content changes
watch(
  () => props.content,
  async (newContent) => {
    processMarkdown(newContent);
    await nextTick();
    extractHeadingsFromHTML();
    addCopyButtons();
    observeHeadings(); // Observe headings on content change
  },
  { immediate: true }
);

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
    <div
      class="flex flex-col md:flex-row w-full container mx-auto space-x-0 md:space-x-10"
    >
      <!-- Rendered Markdown Content -->
      <div
        id="blog-content"
        class="w-full md:w-[70%] text-left order-2 md:order-none flex flex-col"
      >
        <div
          v-html="htmlContent"
          class="prose prose-md prose-invert prose-pre:bg-gray-800 prose-pre:max-h-96  max-w-none"
        ></div>
        <div class="py-3">
          <SingleAuthorDetails type="blog" :authors="authors" client:load />
        </div>
      </div>

      <!-- Table of Contents -->
      <div class="w-full md:w-[30%] mb-8 order-1 md:order-none">
        <TableOfContents :headings="headings" :activeSection="currentSection" />
      </div>
    </div>
  </CustomSection>
</template>
<style></style>
