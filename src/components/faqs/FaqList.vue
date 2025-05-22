<!-- FaqList.vue -->
<template>
  <div class="space-y-6">
    <div v-for="(faq, index) in faqList" :key="index" class="border-b border-gray-200 pb-6 last:border-0">
      <button @click="toggle(index)"
        class="w-full text-left font-medium text-lg md:text-xl flex justify-between items-start hover:text-primary-purple transition-colors cursor-pointer">
        <h2>{{ faq.question }}</h2>
        <span class="ml-4 text-primary-purple text-2xl font-light">
          {{ activeIndex === index ? '-' : '+' }}
        </span>
      </button>
      <p v-if="activeIndex === index" v-html="faq.answer" class="mt-3 text-gray-600 text-base animate-fade-in prose prose-gray max-w-none">
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  faqList: Array
})

const activeIndex = ref(null)

function toggle(index) {
  activeIndex.value = activeIndex.value === index ? null : index
}
</script>

<style>
.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
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