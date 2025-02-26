<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import CustomButton from "./CustomButton.vue";

// Control modal state
const isOpen = ref(false);
const showMainButton = ref(true); // Controls button visibility after modal hides

// Function to open modal
const openModal = () => {
  showMainButton.value = false; // Hide button when opening modal
  isOpen.value = true;
  window.addEventListener("keydown", handleKeydown);
};

// Function to close modal
const closeDialog = () => {
  isOpen.value = false; // Start closing modal
  window.removeEventListener("keydown", handleKeydown);
};

// Function to show button after modal completely hides
const showButton = () => {
  showMainButton.value = true; // Button appears after modal hide transition completes
};

// Handle Escape key press
const handleKeydown = (event) => {
  if (event.key === "Escape") {
    closeDialog();
  }
};

// Function to check scroll position
const handleScroll = () => {
  const scrollY = window.scrollY; // Current scroll position
  const documentHeight = document.documentElement.scrollHeight; // Total document height
  const triggerScroll = documentHeight * 0.2; // 20% of the page height

  // Open modal when user scrolls past the 20% mark
  if (scrollY >= triggerScroll && !isOpen.value) {
    openModal();
  }
};

// Attach scroll listener when component mounts
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

// Remove event listener when component unmounts
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

// Features data
const features = ref([
  { title: "Ingestion - 50 GB logs, 50 GB metrics, 50 GB traces" },
  { title: "Query volume - 200 GB" },
  { title: "Pipelines - 50 GB of Data Processing" },
  { title: "1K RUM & Session Replay" },
  { title: "1K Action Runs" },
  { title: "3 Users" },
  { title: "7-Days Retention" },
]);
</script>

<template>
  <div
    class="fixed right-0 p-2 md:p-0 md:right-0 md:top-1/2 md:transform md:-translate-y-1/2 bottom-4 sm:bottom-4 flex flex-col items-end z-20"
  >
    <!-- Button (Now appears only after modal fully hides) -->
    <button
      v-if="showMainButton"
      @click="openModal"
      class="primary-button px-2 py-1 md:px-2 md:py-2 origin-bottom-right md:-rotate-90"
    >
      <span class="px-3 md:px-3 text-xs">GET STARTED</span>
    </button>

    <!-- Modal with smooth transition -->
    <Transition name="slide-fade" @after-leave="showButton">
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
            Openobserve Cloud Free Tier
          </h2>
          <ul class="space-y-2">
            <li
              v-for="(feature, index) in features"
              :key="index"
              class="flex items-x gap-3 text-xs text-white text-left"
            >
              <img
                src="/img/bg/icon/Frame-11216.svg"
                alt="icon"
                class="w-5 h-5"
              />
              <span>{{ feature.title }}</span>
            </li>
          </ul>
        </div>

        <div class="flex flex-col items-start">
          <CustomButton
            variant="primary"
            size="small"
            class="mt-2 mb-2"
            buttonLink="https://cloud.openobserve.ai/web/login"
          >
            GET STARTED
          </CustomButton>
          <p class="text-white text-xs md:text-sm">
            Get Started in minutes - no credit card required.
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

/* Smooth transition for modal */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition:
    opacity 0.2s ease-out,
    transform 0.2s ease-out;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Primary button styles */
.primary-button {
  position: relative;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 100px;
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
