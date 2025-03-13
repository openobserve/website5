<template>
  <div
    class="sticky top-20 bg-no-repeat bg-center bg-cover rounded-xl p-4 h-[calc(100vh-100px)] overflow-y-auto scrollbar"
    style="
      background-image: url(&quot;/img/bg/gradient-bg/BlogTableOfContentGlassBg.svg&quot;);
    "
  >
    <h3 class="text-lg font-semibold text-white mb-4">Table of Contents</h3>
    <ul class="space-y-4">
      <li v-for="(heading, index) in nestedHeadings" :key="index">
        <a
          :href="`#${heading.id}`"
          class="block text-sm font-medium hover:text-blue-400"
          :class="{
            'text-blue-400': currentSection === heading.id,
            'text-white': currentSection !== heading.id,
            'pl-3': heading.level === 3 || heading.level === 4, // Add left padding for h3, h4
          }"
          @click="setActiveSection(heading.id)"
        >
          {{ heading.text }}
        </a>
        <ul v-if="heading.children.length" class="space-y-2 mt-2 pl-4">
          <li
            v-for="(subHeading, subIndex) in heading.children"
            :key="subIndex"
          >
            <a
              :href="`#${subHeading.id}`"
              class="block text-sm font-normal hover:text-blue-400"
              :class="{
                'text-blue-400': currentSection === subHeading.id,
                'text-white': currentSection !== subHeading.id,
              }"
              @click="setActiveSection(subHeading.id)"
            >
              {{ subHeading.text }}
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";

const props = defineProps({
  headings: {
    type: Array,
    required: true,
  },
  activeSection: {
    type: String,
    required: false,
  },
});
const currentSection = computed(() => {
  return props.activeSection || null;
});

const setActiveSection = (id) => {
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
  // Prevent observer from overriding the clicked section too soon
  setTimeout(() => {
    currentSection.value = id;
  }, 500);
};

// Structure headings into a nested format
const nestedHeadings = computed(() => {
  const nested = [];
  let lastParent = null;

  props.headings.forEach((heading) => {
    if (heading.level === 2 || heading.level === 3) {
      lastParent = { ...heading, children: [] };
      nested.push(lastParent);
    } else if (heading.level === 3 && lastParent) {
      lastParent.children.push(heading);
    }
  });

  return nested;
});
</script>
<style>
.scrollbar::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgb(221, 219, 219);
  border-radius: 10px;
  background-color: #f8f6f6;
}

.scrollbar::-webkit-scrollbar {
  width: 4px;
}

.scrollbar::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgb(245, 244, 244);
  background-color: #808080;
}

/* Small device styles */
@media (max-width: 768px) {
  .scrollbar::-webkit-scrollbar {
    height: 0px; /* Adjust the height for small devices */
  }
}

/* Large device styles */
@media (min-width: 769px) {
  .scrollbar::-webkit-scrollbar {
    height: 0px; /* Adjust the height for large devices */
  }
}
</style>
