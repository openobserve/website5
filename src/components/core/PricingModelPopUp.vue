<template>
  <div
    class="fixed md:right-4 md:top-1/2 md:transform md:-translate-y-1/2 bottom-4 right-4 sm:bottom-4 flex flex-col items-end z-20"
  >
    <!-- Button - hidden immediately when clicked -->
    <button
      v-if="!isOpen"
      @click="openModal"
      class="primary-button px-2 py-1 md:px-2 md:py-2 md:-rotate-90 origin-right"
    >
      <span class="text-base md:text-md">GET STARTED</span>
    </button>

    <!-- Modal with smooth transition -->
    <Transition name="slide-fade">
      <div
        v-if="isOpen"
        class="bg-color rounded-lg shadow-lg max-w-md p-6 relative mx-4"
      >
        <!-- Close Button -->
        <button
          @click="isOpen = false"
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
          <ul class="space-y-3">
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
          <CustomButton variant="primary" class="mt-8 text-base md:text-md">
            GET STARTED
          </CustomButton>
          <p class="text-white text-xs md:text-sm">
            Get Started in minutes-no credit card required.
          </p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from "vue";
import CustomButton from "./CustomButton.vue";

// Control modal state
const isOpen = ref(false);

// Function to open modal - button hides immediately
const openModal = () => {
  isOpen.value = true;
};

// Features data
const features = ref([
  {
    title: "Ingestion - 50 GB logs, 50 GB metrics , 50 GB traces",
  },
  {
    title: "Query volume - 200 GB",
  },
  {
    title: "Pipelines - 50 GB of Data Processing",
  },
  {
    title: "1K RUM & Session Replay",
  },
  {
    title: "1K Action Runs",
  },
  {
    title: "3 Users",
  },
  {
    title: "7-Days Retention",
  },
]);
</script>

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

/* Transition for the modal only */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.2s ease-in;
}
.slide-fade-enter-from {
  transform: translateX(20px);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.primary-button {
  position: relative;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 100px;
  background-origin: border-box;
  background-clip: padding-box, border-box;
  transition: all 0.3s ease;

  /* Base gradient for button fill with matching border in normal state */
  background-image: linear-gradient(180deg, #0095ff 0%, #0088ff 100%);
  /* linear-gradient(180deg, #0095ff 0%, #0088ff 100%); */

  /* Creates a 2px border that matches the button color initially */
  border: 1px solid transparent;
}

.primary-button:hover {
  /* Only change the border gradient on hover */
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

  /* More uniform shadow spread */
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
  /* Slightly reduced shadow when pressed */
  box-shadow: 0 0 10px rgba(0, 136, 255, 0.3);
}

/* Focus state for accessibility */
.primary-button:focus {
  outline: none;
  box-shadow:
    0 0 0 3px rgba(0, 136, 255, 0.3),
    0 0 10px rgba(0, 136, 255, 0.4);
}

/* Disabled state */
.primary-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background-image:
    linear-gradient(180deg, #8cc7ff 0%, #7ab7ff 100%),
    linear-gradient(180deg, #8cc7ff 0%, #7ab7ff 100%);
  box-shadow: none;
}
</style>
