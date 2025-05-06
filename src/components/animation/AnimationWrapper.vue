<template>
    <div class="container mx-auto px-6 py-32">
      <div ref="cardContainer" class="relative h-[32rem]">
        <div
          v-for="(card, index) in cards"
          :key="index"
          :class="[
            'rounded-xl h-96 absolute transition-all duration-700 ease-out',
            showSpread
              ? intialPositions[index]
              : spreadPositions[index],
            card.bg,
          ]"
          :style="{ width: card.width, zIndex: cards.length - index }"
        ></div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  
  const showSpread = ref(false)
  const cardContainer = ref<HTMLElement | null>(null)
  
  const cards = [
    { bg: 'bg-pink-500', width: '16rem' },
    { bg: 'bg-purple-500', width: '20rem' },
    { bg: 'bg-blue-500', width: '24rem' },
  ]
  const intialPositions = [
    'top-24 left-1/3',
    'top-24 left-1/3',
    'top-24 left-1/3',
  ]
  const spreadPositions = [
    'top-0 left-0',
    'top-0 left-1/3',
    'top-0 left-2/3',
  ]
  
  onMounted(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Reverse logic here: collapse on scroll in
        showSpread.value = entry.isIntersecting
          ? false
          : true
      },
      { threshold: 1 }
    )
    if (cardContainer.value) {
      observer.observe(cardContainer.value)
    }
  })
  </script>
  
  <style scoped>
  </style>
  
  
  
    
  
  