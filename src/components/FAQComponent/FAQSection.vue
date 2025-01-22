<script setup>
import { defineProps, ref } from "vue";

const props = defineProps({
  titleBar: {
    type: String,
    required: true,
  },
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
  <div class="w-full bg-[url('/faqBG.svg')] bg-cover bg-center p-2">
    <div class="mx-auto container">
      <!-- Title Bar -->
      <div class="">
        <h2 class="text-2xl md:text-3xl lg:text-4xl font-semibold text-white text-left md:text-center lg:text-center">{{ titleBar }}</h2>
      </div>

      <!-- FAQ Items -->
      <div class="space-y-4 mt-10">
        <div v-for="(item, index) in faqItems" :key="index">
          <div
           
            class="flex justify-between items-center cursor-pointer"
             @click="toggleAnswer(index)"
          >
            <h3 class="lg:font-medium lg:text-lg md:font-semibold text-base text-white mt-4">
              {{ item.question }}
            </h3>
            <span
              class="text-white transition-transform duration-300 ease-in-out"
              :class="{ 'transform rotate-180': visibleAnswers[index] }"
            >
            </span>
            <img 
              src="/faq+Icon.svg" 
              alt="toggle" 
              class="transition-transform"
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
            <p class="text-white  lg:font-light text-sm md:text-base">
              {{ item.answer }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
