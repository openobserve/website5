<template>
  <div class="container mx-auto px-6 py-32">
    <div ref="cardContainer" class="relative h-[32rem] w-full">
      <div
        v-for="(card, index) in cards"
        :key="index"
        :class="[
          'rounded-xl h-[30rem] absolute transition-all duration-700 ease-out',
          currentPositions[positionStage][index],
          card.bg,
        ]"
        :style="{ width: card.width, zIndex: cards.length - index }"
      ></div>
    </div>
  </div>
</template>

<!-- <script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const cardContainer = ref<HTMLElement | null>(null);

const cards = [
  { bg: "bg-pink-500", width: "400px" },
  { bg: "bg-purple-500", width: "440px" },
  { bg: "bg-blue-500", width: "480px" },
];

const positionStage = ref<"initial" | "stage1" | "stage2" | "final">("initial");
const isVisible = ref(false);
const hasSpread = ref(false);

const currentPositions = {
  initial: ["top-24 left-1/3", "top-24 left-1/3", "top-24 left-1/3"],
  stage1: ["top-8 left-[28%]", "top-8 left-1/3", "top-8 left-[45%]"],
  stage2: ["top-4 left-1/6", "top-4 left-1/3", "top-4 left-[55%]"],
  final: ["top-0 left-0", "top-0 left-1/3", "top-0 left-2/3"],
};

function triggerGradualSpread() {
  positionStage.value = "stage1";
  setTimeout(() => {
    positionStage.value = "stage2";
    setTimeout(() => {
      positionStage.value = "final";
    }, 400);
  }, 400);
}

function onScroll() {
  if (isVisible.value && !hasSpread.value) {
    triggerGradualSpread();
    hasSpread.value = true;
    window.removeEventListener("scroll", onScroll);
  }
}

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      isVisible.value = entry.isIntersecting;
      if (isVisible.value && !hasSpread.value) {
        window.addEventListener("scroll", onScroll, { passive: true });
      }
    },
    { threshold: 0.5 }
  );

  if (cardContainer.value) {
    observer.observe(cardContainer.value);
  }
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
});
</script> -->

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const cardContainer = ref<HTMLElement | null>(null)

const cards = [
  { bg: 'bg-pink-500', width: '400px' },
  { bg: 'bg-purple-500', width: '440px' },
  { bg: 'bg-blue-500', width: '480px' },
]

const positionStage = ref<'initial' | 'stage1' | 'stage2' | 'final'>('initial')
const stages = ['initial', 'stage1', 'stage2', 'final'] as const

const currentPositions = {
  initial: ['top-24 left-1/3', 'top-24 left-1/3', 'top-24 left-1/3'],
  stage1: ['top-8 left-[28%]', 'top-8 left-1/3', 'top-8 left-[45%]'],
  stage2: ['top-4 left-1/6', 'top-4 left-1/3', 'top-4 left-[55%]'],
  final: ['top-0 left-0', 'top-0 left-1/3', 'top-0 left-2/3'],
}

// Throttle control
let canScroll = true
const scrollCooldown = 700 // milliseconds

function advanceStage() {
  const currentIndex = stages.indexOf(positionStage.value)
  if (currentIndex < stages.length - 1) {
    positionStage.value = stages[currentIndex + 1]
  }
}

function reverseStage() {
  const currentIndex = stages.indexOf(positionStage.value)
  if (currentIndex > 0) {
    positionStage.value = stages[currentIndex - 1]
  }
}

function onWheel(e: WheelEvent) {
  if (!canScroll) return

  canScroll = false

  if (e.deltaY > 0) {
    // Scroll down
    advanceStage()
  } else if (e.deltaY < 0) {
    // Scroll up
    reverseStage()
  }

  setTimeout(() => {
    canScroll = true
  }, scrollCooldown)
}


onMounted(() => {
  window.addEventListener('wheel', onWheel, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('wheel', onWheel)
})
</script>

