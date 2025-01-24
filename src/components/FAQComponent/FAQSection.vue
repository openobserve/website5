<script setup>
import { defineProps, ref } from "vue";

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
</script>

<template>
  <div class="w-full bg-[url('/faqBg2.svg')] bg-cover bg-center bg-no-repeat h-full">
    <!-- FAQ Items -->
    <div class="space-y-4 mt-10 mb-10">
      <div v-for="(item, index) in faqItems" :key="index">
        <div
          class="flex justify-between items-center cursor-pointer p-4 group relative border border-transparent rounded-xl hover:border hover:border-gradient duration-300 transition-all"
          @click="toggleAnswer(index)"
        >
          <div
            class="absolute inset-0 rounded-md bg-gradient-to-b from-[#296EA7] via-transparent to-[#000000] opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
          ></div>
          <h3
            class="lg:font-medium lg:text-lg md:font-semibold text-base text-white mt-4 z-10"
          >
            {{ item.question }}
          </h3>
          <img
            src="/faq+Icon.svg"
            alt="toggle"
            class="transition-transform duration-300 ease-in-out"
            :class="{ 'rotate-45': visibleAnswers[index] }"
          />
        </div>

        <div
          class="transition-all duration-300 ease-in-out overflow-hidden"
          :class="{
            'max-h-0 opacity-0': !visibleAnswers[index],
            'max-h-96 opacity-100 mt-4': visibleAnswers[index],
          }"
        >
          <p class="text-white lg:font-light text-sm md:text-base">
            {{ item.answer }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.border-gradient {
  border-radius: 20px
}
</style>
