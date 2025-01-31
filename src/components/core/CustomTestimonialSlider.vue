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
  <div class="w-full max-w-md mx-auto px-4">
    <div class="relative perspective">
      <!-- <div
        v-for="(testimonial, index) in testimonials"
        :key="testimonial.id"
        :class="['testimonial-card ', getSlideClass(index)]"
      >
        <div class="bg-gray-900 rounded-2xl p-6 md:p-10 relative shadow-lg">
          <div class="text-5xl text-blue-500 absolute top-3 left-4 opacity-20">
            "
          </div>
          <div class="relative z-10">
            <p class="text-white text-lg md:text-xl mb-6 leading-relaxed">
              {{ testimonial.content }}
            </p>
            <div class="flex items-center">
              <img
                :src="testimonial.avatar"
                :alt="testimonial.author"
                class="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover mr-4"
              />
              <div>
                <h4 class="text-white font-semibold text-base md:text-lg">
                  {{ testimonial.author }}
                </h4>
                <p class="text-gray-400 text-sm md:text-base">
                  {{ testimonial.position }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div> -->

      <div class="hidden md:block relative">
        <div class="flex">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              v-for="(testimonial, index) in testimonials"
              :key="testimonial.id"
              class="bg-[#1a1a1a] rounded-lg p-6 flex flex-col items-center text-center relative"
              :class="['testimonial-card ', getSlideClass(index)]"
            >
              <img
                src="/public/download-pricing/Frame.svg"
                :alt="testimonial.name"
                class="w-20 h-20 rounded-full object-center"
              />
              <p class="text-gray-300 mb-3 text-lg leading-relaxed py-10">
                {{ testimonial.content }}
              </p>
              <img
                src="/blogColor-2.png"
                :alt="testimonial.name"
                class="w-20 h-20 rounded-full object-cover"
              />
              <h3 class="text-blue-400 font-semibold text-lg mb-1">
                {{ testimonial.author }}
              </h3>
              <p class="text-gray-400">{{ testimonial.position }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Buttons -->
      <div>
        <button
          @click="goToPrev"
          class="absolute top-1/2 left-2 md:left-4 z-20 bg-white/10 hover:bg-white/20 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-colors transform -translate-y-1/2"
        >
          <span class="text-white text-lg md:text-2xl">&larr;</span>
        </button>
        <button
          @click="goToNext"
          class="absolute top-1/2 right-2 md:right-4 z-20 bg-white/10 hover:bg-white/20 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-colors transform -translate-y-1/2"
        >
          <span class="text-white text-lg md:text-2xl">&rarr;</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.perspective {
  perspective: 1000px;
}

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

/* Responsive Adjustments */
@media (max-width: 768px) {
  .testimonial-card.current {
    transform: translateX(0) translateZ(0) rotateY(0) scale(0.95);
  }

  .testimonial-card.next {
    transform: translateX(40%) translateZ(-100px) rotateY(-8deg) scale(0.9);
  }

  .testimonial-card.prev {
    transform: translateX(-40%) translateZ(-100px) rotateY(8deg) scale(0.9);
  }

  .testimonial-card.hidden {
    transform: translateX(0) translateZ(-200px) scale(0.85);
  }
}
</style>
