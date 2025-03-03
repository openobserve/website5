<script setup>
import { ref, onMounted, onUnmounted, defineProps } from "vue";
import CustomButton from "./CustomButton.vue";

const props = defineProps({
  primaryButton: {
    type: Object,
    required: true,
  },
  bottomText: {
    type: String,
    required: false,
  },
  items: {
    type: Array,
    required: false,
  },
  featureTitle: {
    type: String,
    required: false,
  },
  monthlyText: {
    type: String,
    required: false,
  },
  inheritAttrs: false, // Prevents Vue from passing extra attributes
});
const isOpen = ref(false);
const showMainButton = ref(false);
const shouldHide = ref(false);
let scrollObserver = null;
const isMobileDevice = ref(false);

const checkIfMobile = () => {
  const mobileRegex =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  isMobileDevice.value = mobileRegex.test(navigator.userAgent);
};
const handleResize = () => {
  // For mobile devices, always hide regardless of orientation
  if (isMobileDevice.value) {
    shouldHide.value = true;
    return;
  }

  // For non-mobile devices, show only if screen is tablet size or larger
  shouldHide.value = window.innerWidth < 640;
};
// Function to open modal
const openModal = () => {
  showMainButton.value = true;
  isOpen.value = true;
};

// Function to close modal
const closeDialog = () => {
  isOpen.value = false;
};

// Function to check scroll position
const handleScroll = () => {
  const scrollY = window.scrollY;
  const triggerScroll = window.innerHeight;

  if (scrollY >= triggerScroll) {
    showMainButton.value = true;
  } else {
    showMainButton.value = false;
    isOpen.value = false;
  }
};

// Function to check visibility of #9
const observeMainComponent = () => {
  const target = document.getElementById("bannerComponent");
  if (target) {
    scrollObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        shouldHide.value = entry.isIntersecting; // Hide if visible
      },
      {
        root: null, // Observe within viewport
        threshold: 0.1, // Trigger when 10% is visible
      }
    );

    scrollObserver.observe(target);
  }
};

// Attach event listeners
onMounted(() => {
  checkIfMobile(); // First detect if it's a mobile device
  handleResize(); // Then check dimensions
  observeMainComponent(); // Start observing visibility
  window.addEventListener("scroll", handleScroll);
});

// Cleanup observers
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  if (scrollObserver) {
    scrollObserver.disconnect();
  }
});
</script>

<template>
  <div
    v-if="!shouldHide && !isMobileDevice"
    class="fixed p-0 right-0 flex-col items-end z-40 hidden sm:flex origin-bottom-right -rotate-90 md:top-44"
  >
    <!-- Button (Now appears only after modal fully hides) -->
    <button
      v-if="showMainButton && !isOpen"
      @click="openModal"
      class="primary-button px-2 py-1 md:px-2 md:py-1"
    >
      <span class="px-3 md:px-3 text-xs">GET STARTED FOR FREE</span>
    </button>
  </div>

  <div
    v-if="!shouldHide"
    class="fixed right-0 p-2 md:p-0 md:right-0 md:transform flex-col items-end z-40 hidden sm:flex md:top-44"
  >
    <!-- Modal with smooth transition -->
    <Transition name="slide-fade">
      <div v-if="isOpen" class="bg-color rounded-lg shadow-lg p-6 relative">
        <!-- Close Button -->
        <button
          @click="closeDialog"
          class="absolute top-1 right-1 w-8 h-8 flex items-center justify-center rounded-full text-white hover:text-gray-200 transition-colors"
        >
          <span class="text-lg">✖</span>
        </button>

        <div class="space-y-4">
          <h2
            class="text-lg md:text-xl font-semibold text-center md:text-left text-white"
          >
            {{ featureTitle }}
          </h2>
          <p class="text-sm text-white">{{ monthlyText }}:</p>
          <ul class="space-y-2">
            <li
              v-for="(feature, index) in items"
              :key="index"
              class="flex items-x gap-3 text-xs text-white text-left"
            >
              <img src="/img/icon/RightTick.svg" alt="icon" class="w-5 h-5" />
              <span>{{ feature.title }}</span>
            </li>
          </ul>
        </div>

        <div class="flex flex-col items-start">
          <CustomButton
            variant="primary"
            size="small"
            class="mt-2 mb-2"
            :buttonLink="primaryButton.link"
            target="_blank"
          >
            {{ primaryButton.text }}
          </CustomButton>
          <p class="text-white text-xs md:text-sm">
            {{ bottomText }}
          </p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style>
/* Vertical text style */
.verticalText {
  writing-mode: vertical-lr;
  text-orientation: mixed;
  display: inline-block;
}

/* Modal specific styles */
.bg-color {
  background: rgba(19, 18, 25, 1);
  border: 1px solid rgba(49, 53, 57, 1);
}

/* Modal smooth transition - Slide from right */
.slide-fade-enter-active {
  transition:
    opacity 0.4s ease-out,
    transform 0.4s ease-out;
}

.slide-fade-leave-active {
  transition:
    opacity 0.3s ease-in,
    transform 0.3s ease-in;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(30px); /* Move from right */
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(30px); /* Move to right when closing */
}

/* Primary button styles */
.primary-button {
  position: relative;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 10px 10px 0px 0px;
  background-origin: border-box;
  background-clip: padding-box, border-box;
  transition: all 0.3s ease;

  background-image: linear-gradient(180deg, #0095ff 0%, #0088ff 100%);
  border: 1px solid transparent;
}
.primary-button:hover {
  background-image:
    linear-gradient(90deg, #0079dd -10.28%, #3bb3ff 92.55%, #76dbff 109.08%),
    linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.95) 0%,
      rgba(128, 200, 255, 0.9) 20%,
      rgba(64, 169, 255, 0.85) 40%,
      rgba(0, 136, 255, 0.8) 60%,
      rgba(0, 106, 255, 0.75) 80%,
      rgba(0, 68, 255, 0.7) 100%
    );

  box-shadow:
    0 0 15px rgba(0, 136, 255, 0.4),
    0 0 20px rgba(0, 106, 255, 0.2);
}

/* Active state */
.primary-button:active {
  background-image:
    linear-gradient(180deg, #0088ff 0%, #0077ff 100%),
    linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.8) 0%,
      rgba(64, 169, 255, 0.7) 40%,
      rgba(0, 106, 255, 0.6) 100%
    );
  box-shadow: 0 0 10px rgba(0, 136, 255, 0.3);
}

/* Disabled state */
.primary-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background-image: linear-gradient(180deg, #8cc7ff 0%, #7ab7ff 100%);
  box-shadow: none;
}
</style>
