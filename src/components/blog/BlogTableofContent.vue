<template>
  <div
    class="sticky top-20 border border-gray-400 rounded-xl p-4 overflow-y-auto scrollbar h-auto max-h-[calc(100vh-100px)]"
  >
    <h3 class="text-lg lg:text-xl font-semibold text-black mb-2">Table of Contents</h3>
    <ul class="space-y-2 ml-2">
      <li v-for="(heading, index) in nestedHeadings" :key="index">
        <a
          :href="`#${heading.id}`"
          class="block text-sm lg:text-base font-medium hover:text-primary-purple"
          :class="{
            'text-primary-purple': currentSection === heading.id,
            'text-gray-600': currentSection !== heading.id,
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
              class="block text-sm font-normal hover:text-primary-purple"
              :class="{
                'text-primary-purple': currentSection === subHeading.id,
                'text-black': currentSection !== subHeading.id,
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
import { computed } from "vue";

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
  const filteredHeadings = props.headings.filter(
    (heading) => heading.text.toLowerCase() !== "key outcomes"
  );

  const nested = [];
  let lastParent = null;

  filteredHeadings.forEach((heading) => {
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
  margin: 4px;
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