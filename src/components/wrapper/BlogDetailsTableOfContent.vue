<template>
  <div class="sticky top-20 bg-no-repeat bg-center bg-cover rounded-xl p-4" style="background-image: url('/Glass.svg')">
    <h3 class="text-lg font-semibold text-white mb-4">Table of Contents</h3>
    <ul class="space-y-4">
      <li v-for="(heading, index) in nestedHeadings" :key="index">
        <a
          :href="`#${heading.id}`"
          class="block text-sm font-medium"
          :class="{ 'text-blue-400': currentSection === heading.id, 'text-white': currentSection !== heading.id }"
          @click="setActiveSection(heading.id)"
        >
          {{ heading.text }}
        </a>
        <ul v-if="heading.children.length" class="space-y-2 mt-2 pl-4">
          <li v-for="(subHeading, subIndex) in heading.children" :key="subIndex">
            <a
              :href="`#${subHeading.id}`"
              class="block text-sm font-normal"
              :class="{ 'text-blue-400': currentSection === subHeading.id, 'text-white': currentSection !== subHeading.id }"
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
import { defineProps, computed, ref } from "vue";

const props = defineProps({
  headings: {
    type: Array,
    required: true,
  },
  activeSection: {
    type: String,
    required: false,
  }
});
const currentSection = computed(() => {
  return props.activeSection || null;
});

const setActiveSection = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

// Structure headings into a nested format
const nestedHeadings = computed(() => {
  const nested = [];
  let lastParent = null;

  props.headings.forEach((heading) => {
    if (heading.level === 2) {
      lastParent = { ...heading, children: [] };
      nested.push(lastParent);
    } else if (heading.level === 3 && lastParent) {
      lastParent.children.push(heading);
    }
  });

  return nested;
});
</script>

