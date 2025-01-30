<template>
    <div
      class="sticky top-20 bg-no-repeat bg-center bg-cover rounded-xl p-4"
      style="background-image: url('/Glass.svg')"
    >
      <h3 class="text-lg font-semibold text-white mb-4">Table of Contents</h3>
      <ul class="space-y-4">
        <li v-for="(heading, index) in headings" :key="index">
          <a
            :href="`#${heading.id}`"
            class="text-white hover:text-blue-400"
            @click="scrollToSection(heading.id)"
          >
            {{ heading.text }}
          </a>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from "vue";
  const emit = defineEmits(["hover-heading"]);
  
  defineProps({
    headings: {
      type: Array,
      required: true,
    },
  });
  
  // Scroll and highlight section on click
  const scrollToSection = (id) => {
    emit("hover-heading", id); // Emit event to highlight the section
  
    const element = document.getElementById(id);
    if (element) {
      // Scroll to the section
      element.scrollIntoView({ behavior: "smooth", block: "start" });
  
      // Highlight the section
      element.classList.add("bg-yellow-500", "text-black", "p-2", "rounded-lg");
  
      // Remove the highlight after 2 seconds
      setTimeout(() => {
        element.classList.remove("bg-yellow-500", "text-black", "p-2", "rounded-lg");
      }, 2000);
    }
  };
  </script>
  