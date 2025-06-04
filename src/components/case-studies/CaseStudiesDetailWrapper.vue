<template>
  <div
    class="flex flex-col lg:flex-row items-start gap-8 container mx-auto px-4 sm:px-6 lg:px-8 xl:px-11"
  >
    <div class="lg:sticky top-24 w-full lg:w-1/5">
      <BlogTableofContent
        :headings="headings"
        :activeSection="currentSection"
      />
    </div>

    <!-- Blog Content -->
    <div class="lg:flex-1 w-full">
      <!-- CaseStudy Cover Image -->
      <section class="rounded-lg mb-6">
        <figure class="shadow-xl">
          <img
            :src="caseStudyImage?.url"
            :alt="caseStudyImage?.alternativeText || caseStudyImage?.name"
            class="object-cover w-full h- rounded-lg"
          />
        </figure>
      </section>
      <div class="lg:hidden block w-full mb-6">
        <div
          v-if="outcomes.length > 0"
          class="p-6 border-l-4 border-l-primary-purple shadow-md bg-white rounded-lg"
        >
          <h3 class="text-xl font-bold mb-4">Key Outcomes</h3>
          <ul class="space-y-4">
            <li
              v-for="(item, index) in outcomes"
              :key="index"
              class="flex items-start"
            >
              <div class="mr-2 mt-1 text-primary-purple">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <span v-html="item.description"></span>
            </li>
          </ul>
        </div>
      </div>
      <div id="blog-content" class="w-full container max-w-4xl">
        <div
          v-html="htmlContent"
          class="prose prose-pre:bg-gray-800 prose-pre:max-h-96 max-w-none break-words prose-table:w-full prose-th:px-4 prose-th:py-2 prose-td:px-4 prose-td:py-2 text-gray-600"
        ></div>
      </div>
    </div>

    <!-- Key Outcomes (desktop only, if needed elsewhere, you can conditionally render) -->
    <div class="lg:block hidden lg:w-1/5">
      <div
        v-if="outcomes.length > 0"
        class="p-6 border-l-4 border-l-primary-purple shadow-md bg-white rounded-lg"
      >
        <h3 class="text-xl font-bold mb-4">Key Outcomes</h3>
        <ul class="space-y-4">
          <li
            v-for="(item, index) in outcomes"
            :key="index"
            class="flex items-start"
          >
            <div class="mr-2 mt-1 text-primary-purple">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <span v-html="item.description"></span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from "vue";
import BlogTableofContent from "../blog/BlogTableofContent.vue";
import { marked } from "marked";
import { slugify } from "@/utils/slugify";
interface Outcome {
  description: string;
}
const props = defineProps({
  content: {
    type: String,
    required: true,
  },
  caseStudyImage: {
    type: Object,
    required: true,
  },
  outcomes: {
    type: Array as () => Outcome[],
    required: false,
  },
});
// const outcomes = [
//   "<strong>70%</strong> reduction in observability costs",
//   "<strong>4x</strong> increase in data retention period",
//   "<strong>50%</strong> reduction in query latency",
//   "<strong>8 weeks</strong> to complete migration",
//   "<strong>Zero</strong> service disruptions during transition",
// ];
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

// Convert Markdown to HTML and inject Key Outcomes after 1st <p>
async function processMarkdown(markdownText: string) {
  if (!markdownText) return;
  const cleanedContent = removeFrontmatter(markdownText);
  htmlContent.value = marked(cleanedContent);
}

// Extract headings & assign IDs
async function extractHeadingsFromHTML() {
  await nextTick(); // Ensure the DOM is updated first
  if (typeof window === "undefined") return; // Avoid SSR issues
  const container = document.getElementById("blog-content");
  if (!container) return;

  headings.value = [];
  const headingElements = container.querySelectorAll("h2, h3,h4, h5, h6");

  headingElements.forEach((heading) => {
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

/**
 * Wrap tables in a scrollable div.
 */
async function wrapTablesWithScroll() {
  await nextTick(); // Ensure DOM updates first
  if (typeof window === "undefined") return; // Avoid SSR issues

  const container = document.getElementById("blog-content");
  if (!container) return;

  container.querySelectorAll("table").forEach((table) => {
    if (table.parentElement.classList.contains("table-wrapper")) return; // Skip if already wrapped

    const wrapper = document.createElement("div");
    wrapper.className = "table-wrapper overflow-x-auto w-full";

    table.parentNode.insertBefore(wrapper, table);
    wrapper.appendChild(table);
  });
}

onMounted(() => {
  processMarkdown(props.content);
  nextTick(() => {
    extractHeadingsFromHTML();
    observeHeadings();
    wrapTablesWithScroll();
  });
});

watch(
  () => headings.value,
  () => {
    observeHeadings();
    wrapTablesWithScroll();
  }
);
</script>
<style scoped>
.table-wrapper {
  max-width: 100%;
  overflow-x: auto;
  display: block;
}

.table-wrapper table {
  min-width: 600px;
  width: 100%;
  border-collapse: collapse;
}

.table-wrapper th,
.table-wrapper td {
  padding: 10px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.table-wrapper th {
  background-color: rgba(255, 255, 255, 0.1);
  font-weight: bold;
}
</style>
