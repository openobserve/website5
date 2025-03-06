<script setup>
import { ref, computed, watchEffect } from "vue";
import { marked } from "marked";

const props = defineProps({
  faqItems: {
    type: Array,
    required: true,
    default: () => [],
  },
});

// Ensure reactivity for dynamically changing faqItems
const visibleAnswers = ref([]);

watchEffect(() => {
  visibleAnswers.value = Array(props.faqItems.length).fill(false);
});

// Toggle visibility of answers
const toggleAnswer = (index) => {
  visibleAnswers.value[index] = !visibleAnswers.value[index];
  visibleAnswers.value = [...visibleAnswers.value]; // Ensures reactivity
};

// Convert markdown to HTML
const renderedAnswers = computed(() =>
  props.faqItems.map((item) => marked(item.answer))
);
</script>

<template>
  <div
    class="w-full bg-[url('/img/bg/gradient-bg/faqBg.svg')] bg-cover bg-center bg-no-repeat h-full"
  >
    <!-- FAQ Items -->
    <div class="space-y-4 my-5 w-full">
      <div v-for="(item, index) in faqItems" :key="index">
        <!-- FAQ Question -->
        <div
          class="flex justify-between items-center cursor-pointer p-4 group relative rounded-xl border border-transparent hover:border-white/20 transition-all duration-300"
          @click="toggleAnswer(index)">
          <div
            class="absolute inset-0 rounded-md bg-gradient-to-t from-[#296EA7] via-transparent to-[#000000] opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none">
          </div>
          <h3 class="lg:font-medium lg:text-lg md:font-semibold text-base text-white z-10">
            {{ item.question }}
          </h3>
          <img src="/img/icon/faq+Icon.svg" alt="toggle" class="transition-transform duration-300 ease-in-out"
            :class="{ 'rotate-45': visibleAnswers[index] }" />
        </div>

        <!-- FAQ Answer -->
        <div class="transition-all duration-300 ease-in-out overflow-hidden px-4 w-full" :class="visibleAnswers[index]
          ? 'max-h-screen opacity-100 mt-4'
          : 'max-h-0 opacity-0'
          ">
          <div class="prose prose-invert max-w-none" v-html="renderedAnswers[index]"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.rotate-45 {
  transform: rotate(45deg);
}
</style>
