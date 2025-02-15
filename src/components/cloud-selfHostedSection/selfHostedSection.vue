<script setup>
import CustomButton from "../core/CustomButton.vue";
import { ref } from "vue";
import CustomSeprater from "../core/CustomSeprater.vue";
import DockerCode from "../core/DockerCode.vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  dockerCommand: {
    type: String,
    required: true,
  },
  downloadTitle: {
    type: String,
    required: true,
  },
  enterpriseTitle: {
    type: String,
    required: true,
  },
  enterpriseDescription: {
    type: String,
    required: true,
  },
  enterpriseFeatures: {
    type: Array,
    required: true,
  },
  enterpriseBottomDescription: {
    type: String,
    required: false,
  },
  selfHostedButton: {
    type: Object,
    required: false,
  },
});

const copied = ref(false);
</script>

<template>
  <div class="w-full container mx-auto">
    <!-- Content Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Cloud Section -->
      <div
        class="bg-[#23282c]/40 rounded-lg p-3 md:p-8 border-r border-gray-800/50"
      >
        <h2 class="text-xl md:text-2xl font-semibold text-white mb-4 md:mb-8">
          {{ title }}
        </h2>
        <div class="flex-grow">
          <ul class="space-y-4 mb-4 md:mb-8">
            <li class="flex gap-3 text-gray-300">
              <span>
                <img
                  src="/download-pricing/docker.svg"
                  alt="icon"
                  class="w-5 md:w-6 h-5 md:h-6"
              /></span>
              <span class="text-sm flex items-center">Docker</span>
            </li>
          </ul>
        </div>

        <!-- Copyable Code Block -->
        <div>
          <DockerCode />
        </div>

        <!-- static icon for downloads -->
        <div class="flex-grow mt-3">
          <ul class="space-y-4 py-4">
            <li class="text-gray-300">
              <a href="" class="flex gap-3 items-center hover:text-white">
                <span>
                  <img
                    src="/download-pricing/downloading.svg"
                    alt="icon"
                    class="w-5 md:w-6 h-5 md:h-6"
                  />
                </span>
                <span class="text-sm">Downloads</span>
              </a>
            </li>
          </ul>
        </div>

        <div
          href="https://github.com/openobserve/openobserve/releases"
          class="text-md md:text-lg font-semibold text-white mb-8"
          v-html="downloadTitle"
        ></div>

        <!-- <div class="flex gap-3 items-center py-5">
          <a
            href="https://github.com/openobserve/openobserve/releases"
            class="p-3 bg-[rgba(35,40,44,0.4)] rounded-lg"
          >
            <img
              src="/public/download-pricing/windows-platform-logo.svg"
              alt=""
              class="h-10 w-10"
            />
          </a>
          <a
            href="https://github.com/openobserve/openobserve/releases"
            class="p-3 bg-[rgba(35,40,44,0.4)] rounded-lg"
          >
            <img src="/public/download-pricing/apple.svg" alt="" class="h-10 w-10" />
          </a>
        </div> 
        <CustomSeprater />-->
      </div>
      <div
        class="bg-[#23282c]/40 rounded-lg p-3 md:p-8 border-r border-gray-800/50"
      >
        <div class="mb-6">
          <h4 class="text-white text-xl md:text-2xl font-medium mb-4 md:mb-4">
            {{ enterpriseTitle }}
          </h4>
          <p class="text-white text-sm md:text-md font-medium">
            {{ enterpriseDescription }}
          </p>
        </div>

        <!-- Features List loop -->
        <div class="flex-grow">
          <ul class="space-y-4 mb-8">
            <li
              v-for="(item, index) in enterpriseFeatures"
              :key="index"
              class="flex gap-3 text-gray-300"
            >
              <span>
                <img
                  src="/rightTick.svg"
                  alt="icon"
                  class="w-5 md:w-6 h-5 md:h-6"
              /></span>
              <span class="text-sm flex-1">{{ item.title }}</span>
            </li>
          </ul>
        </div>
        <div class="mb-6">
          <h4
            class="text-white text-sm md:text-base font-medium py-2"
            v-html="enterpriseBottomDescription"
          ></h4>
        </div>
        <div
          class="mt-10 sm:mt-16 md:mt-20 flex flex-col sm:flex-row items-center justify-center w-full px-4 sm:px-6 md:px-8"
          v-if="selfHostedButton.text && selfHostedButton.link"
        >
          <CustomButton
            variant="primary"
            :button-link="selfHostedButton?.link"
            class="w-[200px] sm:w-[250px] md:w-[300px] lg:w-[400px] text-center py-3"
          >
            {{ selfHostedButton?.text }}
          </CustomButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
button {
  outline: none;
  /* Removes default focus outline */
  border: none;
  /* Ensures no border appears */
}

button:focus {
  outline: none;
  box-shadow: none;
  /* Removes any focus glow */
}

pre {
  overflow-x: auto;
}

/* Custom focus styles */
input:focus,
button:focus {
  outline: none;
}

/* Smooth transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Custom checkbox styles */
input[type="checkbox"] {
  cursor: pointer;
}

input[type="checkbox"]:checked {
  background-color: #3b82f6;
  border-color: #3b82f6;
}

/* Gradient background animation */
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

.bg-gradient-animate {
  background-size: 200% 200%;
  animation: gradient 15s ease infinite;
}
</style>
