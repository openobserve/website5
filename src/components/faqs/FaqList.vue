<!-- FaqList.vue -->
<template>
  <div class="space-y-6">
    <div
      v-for="(faq, index) in parsedFaqList"
      :key="index"
      class="border-b border-gray-200 pb-6 last:border-0 faq-item"
    >
      <button
        @click="toggle(index)"
        class="w-full text-left font-medium text-lg md:text-xl flex gap-2 justify-between items-start md:items-center hover:text-primary-purple transition-colors cursor-pointer"
      >
        <component :is="headingTag" class="flex-grow leading-snug">{{
          faq.question
        }}</component>
        <div class="shrink-0 flex items-center">
          <component
            :is="activeIndex === index ? Minus : Plus"
            class="text-primary-purple w-4 h-4 md:w-5 md:h-5 md:mt-0 mt-1"
          />
        </div>
      </button>

      <p
        v-if="activeIndex === index"
        v-html="faq.htmlAnswer"
        class="mt-3 text-gray-600 text-base animate-fade-in prose prose-gray max-w-none [--tw-prose-bold:theme(colors.black)] [--tw-prose-lead:theme(colors.black)] [--tw-prose-links:#5056ED] [--tw-prose-counters:theme(colors.black)] [--tw-prose-bullets:theme(colors.black)] [--tw-prose-quotes:theme(colors.black)] [--tw-prose-quote-borders:theme(colors.black)] [--tw-prose-captions:theme(colors.black)] [--tw-prose-code:theme(colors.black)]"
      ></p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from "vue";
import { Minus, Plus } from "lucide-vue-next";
import { getValidHeadingTag } from "@/utils/getHeadingTag";
import { marked } from "marked";
const props = defineProps({
  faqList: Array,
  headingLevel: {
    type: String,
    required: false,
  },
});
const headingTag = computed(() => getValidHeadingTag(props.headingLevel));
const activeIndex = ref(null);

// function toggle(index) {
//   activeIndex.value = activeIndex.value === index ? null : index;
// }

function toggle(index) {
  if (activeIndex.value === index) {
    activeIndex.value = null;
    return;
  }

  activeIndex.value = index;

  nextTick(() => {
    nextTick(() => {
      const faqElements = document.querySelectorAll(".faq-item");
      const el = faqElements[index];

      if (!el) return;

      // Use IntersectionObserver to check visibility
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          const isFullyVisible = entry.intersectionRatio === 1;

          if (!isFullyVisible) {
            const y = el.getBoundingClientRect().top + window.pageYOffset - 90; // offset for header, etc.
            window.scrollTo({ top: y, behavior: "smooth" });
          }

          observer.disconnect(); // stop observing after first check
        },
        {
          rootMargin: "-100px 0px 0px 0px",
          threshold: 1.0, // fully visible
        }
      );

      observer.observe(el);
    });
  });
}

// Convert markdown to HTML
const parsedFaqList = computed(() =>
  props.faqList.map((faq) => ({
    ...faq,
    htmlAnswer: marked.parse(faq.answer),
  }))
);
</script>
<style>
.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>