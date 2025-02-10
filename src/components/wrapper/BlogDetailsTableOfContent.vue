<!-- TableOfContents.vue -->
<template>
  <div
    class="sticky top-20 bg-no-repeat bg-center bg-cover rounded-xl p-4"
    style="background-image: url('/Glass.svg')"
  >
    <h3 class="text-lg font-semibold text-white mb-4">Table of Contents</h3>
    <ul class="space-y-4">
      <li v-for="(heading, index) in nestedHeadings" :key="index">
        <a
          :href="`#${heading.id}`"
          class="text-white hover:text-blue-400 font-medium text-sm block"
          @click.prevent="scrollToSection(heading.id)"
        >
          {{ heading.text }}
        </a>
        <ul v-if="heading.children.length" class="space-y-2 mt-2 pl-4">
          <li v-for="(subHeading, subIndex) in heading.children" :key="subIndex">
            <a
              :href="`#${subHeading.id}`"
              class="text-white hover:text-blue-400 text-sm font-normal block"
              @click.prevent="scrollToSection(subHeading.id)"
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
});

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

const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
    element.classList.add("bg-yellow-300", "text-black", "p-2", "rounded-lg");

    setTimeout(() => {
      element.classList.remove("bg-yellow-300", "text-black", "p-2", "rounded-lg");
    }, 2000);
  }
};
</script>
