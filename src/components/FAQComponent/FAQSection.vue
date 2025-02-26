<script setup>
import { computed, defineProps, ref } from "vue";
import CustomImage from "../core/CustomImage.vue";
import { marked } from "marked";

const props = defineProps({
  faqItems: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const visibleAnswers = ref(Array(props.faqItems.length).fill(false));

const toggleAnswer = (index) => {
  visibleAnswers.value[index] = !visibleAnswers.value[index];
};

const renderMarkdown = (markdown) => {
  const content = marked(markdown)
  return content;
};
</script>

<template>
  <div class="w-full bg-[url('/img/bg/gradient-bg/faqBg2.svg')] bg-cover bg-center bg-no-repeat h-full">
    <!-- FAQ Items -->
    <div class="space-y-4 my-5 w-full">
      <div v-for="(item, index) in faqItems" :key="index">
        <div
          class="flex justify-between items-center cursor-pointer p-4 group relative rounded-xl border border-[rgba(0,0,0,0)]  hover:border-[rgba(255,255,255,0.2)] duration-300 transition-all"
          @click="toggleAnswer(index)"
        >
          <div
            class="absolute inset-0 rounded-md bg-gradient-to-t from-[#296EA7] via-transparent to-[#000000] opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
          ></div>
          <h3
            class="lg:font-medium lg:text-lg md:font-semibold text-base text-white z-10"
          >
            {{ item.question }}
          </h3>
          <img
            src="/img/icon/faq+Icon.svg"
            alt="toggle"
            :class="{
              'rotate-45': visibleAnswers[index]
            }"
            class="transition-transform duration-300 ease-in-out"
          />
        </div>

        <div
          class="transition-all duration-300 ease-in-out overflow-hidden px-4 w-full"
          :class="{
            'max-h-0 opacity-0': !visibleAnswers[index],
            'min-h-full opacity-100 mt-4': visibleAnswers[index],
          }"
        >
          <div class="prose  prose-invert max-w-none" v-html="renderMarkdown(item.answer)">
          </div>
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