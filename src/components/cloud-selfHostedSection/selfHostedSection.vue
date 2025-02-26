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
  haDeploymentDescription: {
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

console.log(props.haDeploymentDescription);
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
                  src="/img/icon/docker.svg"
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
        <div class="flex-grow mt-6">
          <ul class="space-y-4 py-4">
            <li class="text-gray-300">
              <div class="flex gap-3 items-center">
                <span>
                  <img
                    src="/img/icon/downloading.svg"
                    alt="icon"
                    class="w-5 md:w-6 h-5 md:h-6"
                  />
                </span>
                <span class="text-sm">Downloads</span>
              </div>
            </li>
          </ul>
        </div>

        <div
          class="text-md md:text-lg font-semibold text-white mb-8 v-html-content"
          v-html="downloadTitle"
        ></div>
        <div class="flex-grow">
          <ul class="space-y-4 pb-[2vh]">
            <li class="text-gray-300">
              <div class="flex gap-3 items-center">
                <span>
                  <img
                    src="/img/HA-Clustering.svg"
                    alt="icon"
                    class="w-4 md:w-5 h-4 md:h-5"
                  />
                </span>
                <span class="text-sm">High Availability(HA) Deployment</span>
              </div>
            </li>
          </ul>
        </div>

        <div
          class="text-md md:text-lg font-semibold text-white mb-8 v-html-content"
          v-html="haDeploymentDescription"
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
          <h4 class="text-white text-lg md:text-xl font-medium mb-4 md:mb-4">
            {{ enterpriseTitle }}
          </h4>
          <p class="text-md md:text-lg font-semibold text-white">
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
        <div
          class="mb-6 text-md md:text-lg font-semibold text-white py-2 v-html-content"
          v-html="enterpriseBottomDescription"
        ></div>
        <div
          class="mt-10 sm:mt-16 md:mt-20 flex flex-col sm:flex-row items-center justify-center w-full px-4 sm:px-6 md:px-8"
          v-if="selfHostedButton.text && selfHostedButton.link"
        >
          <CustomButton
            variant="primary"
            :button-link="selfHostedButton?.link"
            class="w-[200px] sm:w-[250px] md:w-[300px] lg:w-[400px] text-center py-3"
            target="_blank"
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

/* :deep(a) {
  text-decoration: underline;
  color: #3b82f6;
} */

/*  */
:deep(.v-html-content a) {
  color: #3b82f6;
  text-decoration: underline;
}

/* Remove underline for <a> inside buttons */
:deep(button a) {
  text-decoration: none;
  color: inherit;
}
</style>
