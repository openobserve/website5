<template>
  <div
    class="fixed right-4 top-1/2 transform -translate-y-1/2 flex flex-col items-end z-20"
  >
    <!-- Vertical Open Button -->
    <button
      v-if="!isOpen"
      @click="isOpen = true"
      class="px-2 py-6 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition-all transform hover:scale-105"
    >
      <span class="verticalText font-medium">Get Started</span>
    </button>
  </div>
  <!-- Modal with animation -->
  <Transition name="modal">
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-30"
      @click.self="isOpen = false"
    >
      <div
        class="bg-color rounded-lg shadow-lg max-w-md p-6 relative transition-all mx-4"
      >
        <!-- Close Button with improved styling -->
        <button
          @click="isOpen = false"
          class="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full text-white hover:text-gray-200 transition-colors"
        >
          <span class="text-lg">✖</span>
        </button>

        <div class="space-y-4">
          <h2
            class="text-xl md:text-2xl font-semibold text-center md:text-left text-white"
          >
            Openobserve Cloud Free Tier
          </h2>
          <ul class="space-y-3">
            <li
              v-for="(feature, index) in features"
              :key="index"
              class="flex items-x gap-3 text-sm text-white text-left"
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

        <div class="flex flex-col items-center">
          <CustomButton
            variant="primary"
            class="mt-8 bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-all transform hover:translate-y-px font-semibold shadow-md"
          >
            Get Started
          </CustomButton>
          <p class="text-white">
            Get Started in minutes-no credit card required.
          </p>
        </div>
        <!-- "Get Started" Button with hover effect -->
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref } from "vue";
import CustomButton from "./CustomButton.vue";

// Control modal state
const isOpen = ref(false);

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

/* Modal animations */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}
.modal-enter-from {
  opacity: 0;
  transform: scale(0.9);
}
.modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
.bg-color {
  background: rgba(19, 18, 25, 1);
}
</style>
