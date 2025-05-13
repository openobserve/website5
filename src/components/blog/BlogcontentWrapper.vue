<script setup>
import { ref, watch, onMounted, nextTick } from "vue";
import { marked } from "marked";
import CustomSection from "../core/CustomSection.vue";
import CustomImage from "../core/CustomImage.vue";
import { slugify } from "@/utils/slugify";
import BlogTableofContent from "./BlogTableofContent.vue";
import SingleAuthorDetails from "./SingleAuthorDetails.vue";
// import SingleAuthorDetails from "../blogs/SingleAuthorDetails.vue";

// Define props
const props = defineProps({
  content: {
    type: String,
    required: true,
  },
  authors: {
    type: Array,
    required: true,
  },
  type: {
    type: String,
  },
  bannerData: {
    type: Object,
  },
});

// Reactive variables
const htmlContent = ref(""); // Stores rendered markdown
const headings = ref([]);
const emit = defineEmits(["update-headings"]);
const currentSection = ref("");
const showPopup = ref(false);
const popupImageSrc = ref("");

/**
 * Remove frontmatter (metadata) from markdown content.
 */
function removeFrontmatter(content) {
  return content.replace(/^(---|\+\+\+)[\s\S]+?\1/, "").trim();
}

// /**
//  * Convert Markdown to HTML.
//  */
async function processMarkdown(markdownText) {
  if (!markdownText) return;

  const cleanedContent = removeFrontmatter(markdownText);
  htmlContent.value = marked(cleanedContent);
  // await nextTick();
  // extractHeadingsFromHTML();
}

const contentSections = ref([]); // Stores split content sections

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
    button.innerHTML = `<img src="/img/icon/copy.svg" alt="COpy Icon" />`;
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
        button.innerHTML = `<img src="/img/icon/copied.svg" alt="Copy Icon" class="h-5 w-5" />`;
        setTimeout(
          () =>
            (button.innerHTML = `<img src="/img/icon/copy.svg" alt="Copy Icon" />`),
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

/**
 * Wrap images in a clickable container to trigger popup.
 */
async function wrapImagesWithPopup() {
  await nextTick();
  if (typeof window === "undefined") return;

  const container = document.getElementById("blog-content");
  if (!container) return;

  container.querySelectorAll("img:not(.copy-button img)").forEach((img) => {
    img.style.cursor = "zoom-in";
    img.addEventListener("click", () => openPopup(img.src));
  });
}
function openPopup(src) {
  popupImageSrc.value = src;
  showPopup.value = true;
  window.addEventListener("keydown", handleKeydown);
}
function closePopup() {
  showPopup.value = false;
  popupImageSrc.value = "";
  window.removeEventListener("keydown", handleKeydown);
}
function handleKeydown(event) {
  if (event.key === "Escape") {
    closePopup();
  }
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

function splitContent() {
  if (typeof document === "undefined") return; // Prevent SSR issues

  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlContent.value;
  const children = Array.from(tempDiv.childNodes);
  const h2TagsLength = children.filter((node) => node.nodeName === "H2").length;
  const splitPoint = Math.min(h2TagsLength, 4); // Adjust this based on your needs
  let chunk = [];
  let paragraphCount = 0;
  contentSections.value = [];

  children.forEach((node) => {
    if (node.nodeName === "H2") paragraphCount++;

    if (paragraphCount === splitPoint) {
      contentSections.value.push(chunk);
      contentSections.value.push("CUSTOM_COMPONENT"); // Placeholder for Vue component
      chunk = [];
      paragraphCount++;
    }
    chunk.push(node.outerHTML);
  });

  if (chunk.length) {
    contentSections.value.push(chunk);
  }
}

// Watch for content changes
watch(
  () => props.content,
  async (newContent) => {
    processMarkdown(newContent);
    await nextTick();
    extractHeadingsFromHTML();
    addCopyButtons();
    // observeHeadings(); // Observe headings on content change
    wrapImagesWithPopup();
    wrapTablesWithScroll();
  },
  { immediate: true }
);

watch(
  () => {
    return headings.value;
  },
  () => {
    observeHeadings();
  }
);

// Run once when the component mounts
onMounted(() => {
  processMarkdown(props.content);
  extractHeadingsFromHTML();
  addCopyButtons();
  observeHeadings(); // Observe headings after mount
  wrapTablesWithScroll();
  wrapImagesWithPopup();
  // splitContent();
});
</script>

<template>
  <CustomSection>
    <div
      class="flex flex-col lg:flex-row container mx-auto space-x-0 md:space-x-10 max-w-7xl"
    >
      <div
        class="flex flex-col w-full lg:w-[70%] text-left order-2 md:order-none"
      >
        <div id="blog-content" class="">
          <template>
            <div
              v-html="htmlContent"
              class="prose prose-md prose-invert prose-pre:bg-gray-800 prose-pre:max-h-96 max-w-none break-words prose-table:w-full prose-th:px-4 prose-th:py-2 prose-td:px-4 prose-td:py-2 text-gray-600 [--tw-prose-body:theme(colors.black)] [--tw-prose-headings:theme(colors.black)] [--tw-prose-bold:theme(colors.black)] [--tw-prose-lead:theme(colors.black)] [--tw-prose-links:theme(colors.black)] [--tw-prose-counters:theme(colors.black)] [--tw-prose-bullets:theme(colors.black)] [--tw-prose-quotes:theme(colors.black)] [--tw-prose-quote-borders:theme(colors.black)] [--tw-prose-captions:theme(colors.black)] [--tw-prose-code:theme(colors.black)] text-sm lg:text-base"
            ></div>
          </template>
        </div>
        <div class="py-3">
          <SingleAuthorDetails :type="type" :author="authors" client:load />
        </div>
      </div>
      <div class="w-full lg:w-[30%] mb-8 order-1 lg:order-none">
        <BlogTableofContent
          :headings="headings"
          :activeSection="currentSection"
        />
      </div>
    </div>
  </CustomSection>
  <!-- Image Popup (Updated as per your CSS) -->
  <div
    v-if="showPopup"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50 h-screen"
    @click="closePopup"
  >
    <button
      class="absolute top-3 right-3 text-white cursor-pointer z-50"
      @click="closePopup"
    >
      ✖
    </button>
    <div class="flex items-center p-8 md:p-[5rem] rounded-lg md:h-screen">
      <CustomImage
        :src="popupImageSrc"
        class="w-full max-h-[90vh] object-contain"
        @click.stop
      />
    </div>
  </div>
</template>
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
