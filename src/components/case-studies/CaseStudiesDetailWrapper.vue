<template>
  <div
    class="flex flex-col lg:flex-row items-start gap-8 container mx-auto px-4 sm:px-6 lg:px-8 xl:px-11"
  >
    <div class="lg:sticky top-20 w-full lg:w-[30%]">
      <BlogTableofContent
        :headings="headings"
        :activeSection="currentSection"
      />
    </div>
    <div class="lg:flex-1 w-full lg:w-[70%]">
      <div id="blog-content" class="">
        <template>
          <div
            v-html="htmlContent"
            class="prose prose-md prose-invert prose-pre:bg-gray-800 prose-pre:max-h-96 max-w-none break-words prose-table:w-full prose-th:px-4 prose-th:py-2 prose-td:px-4 prose-td:py-2 text-gray-600 [--tw-prose-body:theme(colors.black)] [--tw-prose-headings:theme(colors.black)] [--tw-prose-bold:theme(colors.black)] [--tw-prose-lead:theme(colors.black)] [--tw-prose-links:theme(colors.black)] [--tw-prose-counters:theme(colors.black)] [--tw-prose-bullets:theme(colors.black)] [--tw-prose-quotes:theme(colors.black)] [--tw-prose-quote-borders:theme(colors.black)] [--tw-prose-captions:theme(colors.black)] [--tw-prose-code:theme(colors.black)] text-sm lg:text-base"
          ></div>
        </template>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from "vue";
import BlogTableofContent from "../blog/BlogTableofContent.vue";
import { marked } from "marked";
import { slugify } from "@/utils/slugify";
const props = defineProps({
  content: {
    type: String,
    required: true,
  },
});

const htmlContent = ref(""); // Stores rendered markdown
const headings = ref([]);
const emit = defineEmits(["update-headings"]);
const currentSection = ref("");

/**
 * Remove frontmatter (metadata) from markdown content.
 */
function removeFrontmatter(content: string) {
  return content.replace(/^(---|\+\+\+)[\s\S]+?\1/, "").trim();
}

// /**
//  * Convert Markdown to HTML.
//  */
async function processMarkdown(markdownText: string) {
  if (!markdownText) return;

  const cleanedContent = removeFrontmatter(markdownText);
  htmlContent.value = marked(cleanedContent);
  // await nextTick();
  // extractHeadingsFromHTML();
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
  const headingElements = container.querySelectorAll("h2, h3,h4, h5, h6");

  headingElements.forEach((heading, index) => {
    const level = parseInt(heading.tagName.replace("H", ""), 10);
    const text = heading.textContent.trim();
    const id = slugify(text);

    heading.setAttribute("id", id); // ✅ Assign ID to actual element
    headings.value.push({ id, text, level });
  });

  emit("update-headings", headings.value);
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

  const headingElements = container.querySelectorAll("h2, h3, h4");
  headingElements.forEach((heading) => observer.observe(heading));
}

onMounted(() => {
  processMarkdown(props.content);
  nextTick(() => {
    extractHeadingsFromHTML();
    observeHeadings();
  });
});

watch(
  () => {
    return headings.value;
  },
  () => {
    observeHeadings();
  }
);
</script>
