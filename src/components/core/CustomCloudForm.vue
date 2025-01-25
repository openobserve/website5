<script setup>
const props = defineProps({
  cloudSection: {
    type: Object,
    required: true,
  },
  selfHostedSection: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["submit"]);

const handleSubmit = () => {
  emit("submit");
};
</script>

<template>
  <div class="w-full max-w-7xl mx-auto relative">
    <!-- Background Gradient Effects -->
    <div
      class="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-orange-500/20 blur-3xl opacity-20"
    ></div>

    <!-- Header Tabs -->
    <div class="relative grid grid-cols-2 text-center text-white">
      <div
        class="bg-gradient-to-r from-[#0066FF] via-[#0055FF] to-[#0044FF] py-4 rounded-tl-xl font-medium text-lg"
      >
        Cloud
      </div>
      <div
        class="bg-gradient-to-r from-[#2A2D31] to-[#1A1D21] py-4 rounded-tr-xl font-medium text-lg"
      >
        Self-Hosted
      </div>
    </div>

    <!-- Content Section -->
    <div class="grid md:grid-cols-2 gap-0">
      <!-- Cloud Section -->
      <div
        class="bg-gradient-to-b from-[#1A1D21] to-[#141618] rounded-bl-xl p-8 border-r border-gray-800/50"
      >
        <h2 class="text-2xl font-semibold text-white mb-8">
          {{ cloudSection.title }}
        </h2>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="space-y-2">
            <label class="text-gray-300 text-sm font-medium block">Name</label>
            <input
              type="text"
              placeholder="Enter here"
              class="w-full bg-[#2A2D31] border border-gray-700/50 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
            />
          </div>

          <div class="flex items-start gap-3">
            <input
              type="checkbox"
              id="terms"
              class="mt-1 h-4 w-4 rounded border-gray-600 bg-[#2A2D31] text-blue-500 focus:ring-blue-500 focus:ring-offset-0"
            />
            <label for="terms" class="text-sm text-gray-300 leading-relaxed">
              {{ cloudSection.termsText }}
              <a href="#" class="text-blue-400 hover:text-blue-300 underline">
                {{ cloudSection.termsLink }}
              </a>
            </label>
          </div>

          <button
            type="submit"
            class="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white py-3 rounded-lg transition-all duration-300 font-medium text-sm uppercase tracking-wide shadow-lg shadow-blue-500/25"
          >
            {{ cloudSection.buttonText }}
          </button>

          <!-- Login Options -->
          <div class="pt-8">
            <p class="text-center text-gray-400 text-sm mb-4">
              {{ cloudSection.loginText }}
            </p>
            <div class="flex justify-center gap-4">
              <button
                v-for="provider in ['google', 'github', 'microsoft']"
                :key="provider"
                class="p-3 bg-[#2A2D31] rounded-lg hover:bg-[#32363B] transition-all duration-200 shadow-lg shadow-black/20"
              >
                <img
                  :src="`/${provider}-icon.svg`"
                  :alt="`${provider} login`"
                  class="h-6 w-6"
                />
              </button>
            </div>
          </div>
        </form>
      </div>

      <!-- Self-Hosted Section -->
      <div
        class="bg-gradient-to-b from-[#1A1D21] to-[#141618] rounded-br-xl p-8"
      >
        <h2 class="text-2xl font-semibold text-white mb-8">
          {{ selfHostedSection.title }}
        </h2>

        <ul class="space-y-4 mb-8">
          <li
            v-for="(feature, index) in selfHostedSection.features"
            :key="index"
            class="text-gray-300 flex items-center gap-3 text-sm"
          >
            <span
              class="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center"
            >
              <svg
                class="h-3 w-3 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2.5"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </span>
            {{ feature }}
          </li>
        </ul>

        <!-- Trial Section -->
        <div class="border-t border-gray-800/50 pt-6">
          <h3 class="text-xl font-semibold text-white mb-3">
            {{ selfHostedSection.trialTitle }}
          </h3>
          <p class="text-gray-400 text-sm leading-relaxed">
            {{ selfHostedSection.trialDescription }}
          </p>
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
