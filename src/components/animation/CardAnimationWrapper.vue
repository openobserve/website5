<!-- <template>
    <div class="container mx-auto px-6 py-32">
      <div ref="cardContainer" class="relative h-[32rem] w-full">
        <div
          v-for="(card, index) in cards"
          :key="index"
          :class="[ 
            'rounded-xl h-[30rem] absolute transition-all duration-700 ease-out', 
            card.bg 
          ]"
          :style="{
          width: card.width,
          zIndex: cards.length - index,
          left: dynamicLefts[index] || '33%', // fallback center
        }"
        >      </div>
        <p class="text-black absolute top-0 left-0 z-50">{{ dynamicLefts }}</p></div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onUnmounted } from "vue";
  
  const cardContainer = ref<HTMLElement | null>(null);
  
  const cards = [
    { bg: "bg-pink-500", width: "400px" },
    { bg: "bg-purple-500", width: "440px" },
    { bg: "bg-blue-500", width: "480px" },
  ];
  
  const dynamicLefts = ref<string[]>(['33%', '33%', '33%']); // default values
  
  function calculateLeftPercent(ratio: number, index: number): string {
  const base = 30;
  const spread = 10;
  const left = base + spread * ratio * (index + 1);
  return `${left}%`;
}
function updateCardPositions(ratio: number) {
  dynamicLefts.value = cards.map((_, index) => calculateLeftPercent(ratio, index));
}
  
  onMounted(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        updateCardPositions(entry.intersectionRatio);
      },
      {
        threshold: [0, 0.2, 0.5, 0.7, 1], // dynamic calculation will happen at these intervals
      }
    );
  
    if (cardContainer.value) {
      observer.observe(cardContainer.value);
    }
  });
  </script>
   -->

<template>
  <div class="container mx-auto px-6 py-32">
    <div ref="cardContainer" class="relative h-[32rem] w-full overflow-hidden">
      <div
        v-for="(card, index) in cards"
        :key="index"
        class="rounded-xl h-[30rem] absolute top-0 transition-all duration-700 ease-out"
        :class="card.bg"
        :style="{
          width: card.width,
          zIndex: cards.length - index,
          left: activeLefts[index] || '33%',
        //   left: dynamicLefts[index] || '33%',
        }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const cardContainer = ref<HTMLElement | null>(null);
const dynamicLefts = ref<string[]>(["10%", "30%", "53%"]); // default values
const dynamicLefts2 = ref<string[]>(["8%", "33%", "60%"]); // default values
const dynamicLefts3 = ref<string[]>(["5.3%", "33%", "63.5%"]); // default values
const dynamicLefts4 = ref<string[]>(["4%", "33%", "65%"]); // default values
const cards = [
  { bg: "bg-pink-500", width: "400px" },
  { bg: "bg-purple-500", width: "440px" },
  { bg: "bg-blue-500", width: "480px" },
];

const activeLefts = ref([...dynamicLefts.value]) // Start overlapped
const hasSpread = ref(false); // 🔐 Guard to stop updates once fully spread

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      const ratio = entry.intersectionRatio
       // Once fully spread, never update again
       if (hasSpread.value) return;
      if (ratio >= 1) {
        activeLefts.value = dynamicLefts4.value
        hasSpread.value = true
      } else if (ratio >= 0.8) {
        activeLefts.value = dynamicLefts3.value
      } else if (ratio >= 0.6) {
        activeLefts.value = dynamicLefts2.value
      } else if (ratio >= 0.2) {
        activeLefts.value = dynamicLefts.value
      }
      else {
      // 🔥 When fully out of viewport, spread the cards
        activeLefts.value = dynamicLefts.value;
      }
    },
    { threshold: [0.2, 0.6, 0.8, 1] }
  )

  if (cardContainer.value) {
    observer.observe(cardContainer.value)
  }
})

</script>
