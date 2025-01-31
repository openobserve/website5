<script setup>
import CustomButton from "../core/CustomButton.vue";

import CustomSeprater from "../core/CustomSeprater.vue";

const props = defineProps({
  cloudSection: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="w-full max-w-7xl mx-auto relative">
    <!-- Background Gradient Effects -->
    <div
      class="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-orange-500/20 blur-3xl opacity-20"
    ></div>

    <!-- Content Section -->
    <div class="grid md:grid-cols-2 gap-5">
      <!-- Cloud Section -->
      <div class="bg-[#23282c]/40 rounded-lg p-8 border-r border-gray-800/50">
        <h2 class="text-2xl font-semibold text-white mb-8">Open Source</h2>
        <div class="flex-grow">
          <ul class="space-y-4 mb-8">
            <li class="flex gap-3 text-gray-300">
              <span>
                <img
                  src="/download-pricing/docker.svg"
                  alt="icon"
                  class="w-6 h-6"
              /></span>
              <span class="text-sm">Docker</span>
            </li>
          </ul>
        </div>
        <div>
          <img src="/download-pricing/dockerImage.png" alt="" />
        </div>
        <div class="flex-grow">
          <ul class="space-y-4 py-4">
            <li class="flex gap-3 text-gray-300">
              <span>
                <img
                  src="/download-pricing/downloading.svg"
                  alt="icon"
                  class="w-6 h-6"
              /></span>
              <span class="text-sm">Download</span>
            </li>
          </ul>
        </div>
        <h2 class="text-lg font-semibold text-white mb-8">
          Binaries can be downloaded from releases page for the appropriate
          platform.
        </h2>

        <div class="flex gap-3 items-center py-10">
          <div class="p-10 bg-[rgba(35,40,44,0.4)] rounded-lg">
            <img
              src="/public/download-pricing/windows-platform-logo.svg"
              alt=""
            />
          </div>
          <div class="p-10 bg-[rgba(35,40,44,0.4)] rounded-lg">
            <img src="/public/download-pricing/apple.svg" alt="" />
          </div>
        </div>
        <CustomSeprater />
      </div>
      <div class="bg-[#23282c]/40 rounded-lg p-8 border-r border-gray-800/50">
        <div class="mb-6">
          <h4 class="text-white text-xl font-medium py-5">Enterprice</h4>
          <p class="text-white text-xl font-medium py-2">
            Environments Enterprise-Grade Features for Complex Environments
          </p>
        </div>

        <!-- Features List -->
        <div class="flex-grow">
          <ul class="space-y-4 mb-8">
            <li class="flex gap-3 text-gray-300">
              <span>
                <img
                  src="/resources/Frame-11216.svg"
                  alt="icon"
                  class="w-6 h-6"
              /></span>
              <span class="text-sm">Single Sign On (SSO)</span>
            </li>
            <li class="flex gap-3 text-gray-300">
              <span>
                <img
                  src="/resources/Frame-11216.svg"
                  alt="icon"
                  class="w-6 h-6"
              /></span>
              <span class="text-sm">Role-Based Access Control (RBAC)</span>
            </li>
            <li class="flex gap-3 text-gray-300">
              <span>
                <img
                  src="/resources/Frame-11216.svg"
                  alt="icon"
                  class="w-6 h-6"
              /></span>
              <span class="text-sm"
                >Search concurrency control at cluster & user level Super
                Cluster</span
              >
            </li>
          </ul>
        </div>
        <div class="mb-6">
          <h4 class="text-white text-lg font-medium py-2">
            Take charge of your observability with zero upfront costs.
          </h4>
        </div>
        <div>
          <CustomButton variant="primary"> DOCUMENATION </CustomButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom focus styles */
input:focus,
button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
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
