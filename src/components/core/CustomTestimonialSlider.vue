<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const props = defineProps({
  testimonials: {
    type: Array,
    required: true,
    default: () => [],
  },
});
const currentIndex = ref(0);
const isAnimating = ref(false);

const goToNext = () => {
  if (isAnimating.value) return;
  isAnimating.value = true;
  currentIndex.value = (currentIndex.value + 1) % props.testimonials.length;
  setTimeout(() => {
    isAnimating.value = false;
  }, 500);
};

const goToPrev = () => {
  if (isAnimating.value) return;
  isAnimating.value = true;
  currentIndex.value =
    currentIndex.value === 0
      ? props.testimonials.length - 1
      : currentIndex.value - 1;
  setTimeout(() => {
    isAnimating.value = false;
  }, 500);
};

// Handle swipe gestures
let touchStartX = 0;
let touchEndX = 0;

const handleTouchStart = (event) => {
  touchStartX = event.touches[0].clientX;
};

const handleTouchMove = (event) => {
  touchEndX = event.touches[0].clientX;
};

const handleTouchEnd = () => {
  if (touchStartX - touchEndX > 50) {
    goToNext();
  } else if (touchEndX - touchStartX > 50) {
    goToPrev();
  }
};

// Add and remove event listeners
onMounted(() => {
  window.addEventListener("touchstart", handleTouchStart);
  window.addEventListener("touchmove", handleTouchMove);
  window.addEventListener("touchend", handleTouchEnd);
});

onUnmounted(() => {
  window.removeEventListener("touchstart", handleTouchStart);
  window.removeEventListener("touchmove", handleTouchMove);
  window.removeEventListener("touchend", handleTouchEnd);
});

const getSlideClass = (index) => {
  const position =
    (index - currentIndex.value + props.testimonials.length) %
    props.testimonials.length;
  if (position === 0) return "current";
  if (position === 1) return "next";
  if (position === props.testimonials.length - 1) return "prev";
  return "hidden";
};
</script>

<template>
  <div class="w-full max-w-md mx-auto px-4 items-center min-h-[500px] md:min-h-screen">
    <div class="relative perspective">
      <!-- Desktop View -->
      <div class="hidden md:block relative">
        <div class="flex">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              v-for="(testimonial, index) in testimonials"
              :key="testimonial.id"
              class="bg-[#1a1a1a] rounded-lg p-6 flex flex-col items-center text-center relative"
              :class="['testimonial-card', getSlideClass(index)]"
            >
              <img
                 :src="testimonial.image?.formats?.small.url"
                :alt="testimonial.name"
                class="w-20 h-20 rounded-full object-center"
              />
              <p class="text-gray-300 mb-3 text-lg leading-relaxed py-10">
                {{ testimonial.description }}
              </p>
              <h3 class="text-blue-400 font-semibold text-lg mb-1">
                {{ testimonial.name }}
              </h3>
              <p class="text-gray-400">{{ testimonial.role }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile View -->
      <div class="md:hidden relative">
        <div class="flex overflow-hidden">
          <div
            v-for="(testimonial, index) in testimonials"
            :key="testimonial.id"
            class="bg-[#1a1a1a] rounded-lg p-4 flex-shrink-0 w-full flex flex-col items-center text-center transition-transform duration-300 ease-in-out relative"
            :style="{
              transform: `translateX(-${currentIndex * 100}%)`,
            }"
          >
            <div class="flex items-center gap-4 absolute left-4 top-4">
              <img
                :src="testimonial.image?.formats?.small.url"
                :alt="testimonial.name"
                class="w-12 h-12 rounded-full object-center"
              />
              <div class="text-left">
                <h3 class="text-blue-400 font-semibold text-base">
                  {{ testimonial.name }}
                </h3>
                <p class="text-gray-400 text-sm">{{ testimonial.role }}</p>
              </div>
            </div>
            
            <p class="text-gray-300 text-sm leading-relaxed mt-20 mb-4">
              {{ testimonial.description }}
            </p>
          </div>
        </div>

        <!-- Mobile Navigation -->
        <div class="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-between px-2 z-10">
          <button
            @click="goToPrev"
            class="bg-white/10 hover:bg-white/20 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
            :disabled="isAnimating"
          >
            <span class="text-white text-lg">&larr;</span>
          </button>

          <button
            @click="goToNext"
            class="bg-white/10 hover:bg-white/20 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
            :disabled="isAnimating"
          >
            <span class="text-white text-lg">&rarr;</span>
          </button>
        </div>

        <!-- Pagination Dots -->
        <div class="flex justify-center gap-2 mt-4 bg-">
          <div
            v-for="(_, index) in testimonials"
            :key="index"
            class="w-1.5 h-1.5 rounded-full transition-colors duration-300"
            :class="index === currentIndex ? 'bg-blue-400' : 'bg-gray-600'"
          ></div>
        </div>
      </div>

      <!-- Desktop Navigation Buttons -->
      <div class="hidden md:block">
        <button
          @click="goToPrev"
          class="absolute top-1/2 left-4 z-20 bg-white/10 hover:bg-white/20 w-12 h-12 rounded-full flex items-center justify-center transition-colors transform -translate-y-1/2"
        >
          <span class="text-white text-2xl">&larr;</span>
        </button>
        <button
          @click="goToNext"
          class="absolute top-1/2 right-4 z-20 bg-white/10 hover:bg-white/20 w-12 h-12 rounded-full flex items-center justify-center transition-colors transform -translate-y-1/2"
        >
          <span class="text-white text-2xl">&rarr;</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.perspective {
  perspective: 1000px;
}

/* Desktop Styles */
@media (min-width: 768px) {
  .testimonial-card {
    position: absolute;
    width: 100%;
    transition: all 0.5s ease-in-out;
    opacity: 0;
    transform: translateX(-50%) translateZ(-200px) rotateY(45deg);
    pointer-events: none;
  }

  .testimonial-card.current {
    opacity: 1;
    transform: translateX(0) translateZ(0) rotateY(0);
    z-index: 10;
    pointer-events: auto;
  }

  .testimonial-card.next {
    opacity: 1;
    filter: blur(5px);
    transform: translateX(50%) translateZ(-100px) rotateY(-10deg);
    z-index: 5;
  }

  .testimonial-card.prev {
    opacity: 1;
    filter: blur(5px);
    transform: translateX(-50%) translateZ(-100px) rotateY(10deg);
    z-index: 5;
  }

  .testimonial-card.hidden {
    opacity: 0;
    transform: translateX(0) translateZ(-200px);
    z-index: 0;
  }
}

/* Mobile Styles */
@media (max-width: 767px) {
  .testimonial-card {
    transition: transform 0.3s ease-in-out;
  }
}
</style>