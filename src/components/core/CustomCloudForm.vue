<script setup>
const props = defineProps({
  cloudSection: {
    type: Object,
    required: true,
    // Expected structure:
    // {
    //   title: 'Create a free account',
    //   buttonText: 'CREATE AN ACCOUNT',
    //   termsText: 'I confirm I have read and agree to OpenObserve\'s',
    //   termsLink: 'Terms and Conditions.',
    //   loginText: 'Login with'
    // }
  },
  selfHostedSection: {
    type: Object,
    required: true,
    // Expected structure:
    // {
    //   title: 'Free forever access',
    //   features: [
    //     '10K metrics',
    //     '50GB logs',
    //     '50GB traces',
    //     // ...more features
    //   ],
    //   trialTitle: '15-day unlimited usage trial',
    //   trialDescription: 'Unlimited metrics, logs, and users, long-term retention, and premium team collaboration features.'
    // }
  },
});

const emit = defineEmits(["submit"]);

const handleSubmit = () => {
  emit("submit");
};
</script>

<template>
  <div class="w-full max-w-7xl mx-auto">
    <!-- Header Tabs -->
    <div class="grid grid-cols-2 text-center text-white mb-8">
      <div
        class="bg-gradient-to-r from-blue-600 to-blue-400 py-4 rounded-tl-lg"
      >
        Cloud
      </div>
      <div
        class="bg-gradient-to-r from-gray-700 to-gray-800 py-4 rounded-tr-lg"
      >
        Self-Hosted
      </div>
    </div>

    <!-- Content Section -->
    <div class="grid md:grid-cols-2 gap-8">
      <!-- Cloud Section -->
      <div class="bg-[#1A1A1A] rounded-lg p-8">
        <h2 class="text-2xl font-semibold text-white mb-6">
          {{ cloudSection.title }}
        </h2>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div>
            <label class="text-gray-400 text-sm mb-2 block">Name</label>
            <input
              type="text"
              placeholder="Enter here"
              class="w-full bg-[#2A2A2A] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div class="flex items-start gap-2">
            <input
              type="checkbox"
              id="terms"
              class="mt-1.5 h-4 w-4 rounded border-gray-700 bg-[#2A2A2A] text-blue-500 focus:ring-blue-500"
            />
            <label for="terms" class="text-sm text-gray-400">
              {{ cloudSection.termsText }}
              <a href="#" class="text-white hover:text-blue-400 underline">
                {{ cloudSection.termsLink }}
              </a>
            </label>
          </div>

          <button
            type="submit"
            class="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg transition-colors duration-200"
          >
            {{ cloudSection.buttonText }}
          </button>

          <!-- Login Options -->
          <div class="pt-6">
            <p class="text-center text-gray-400 text-sm mb-4">
              {{ cloudSection.loginText }}
            </p>
            <div class="flex justify-center gap-4">
              <button
                v-for="provider in ['google', 'github', 'microsoft']"
                :key="provider"
                class="p-3 bg-[#2A2A2A] rounded-lg hover:bg-[#3A3A3A] transition-colors duration-200"
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
      <div class="bg-[#1A1A1A] rounded-lg p-8">
        <h2 class="text-2xl font-semibold text-white mb-6">
          {{ selfHostedSection.title }}
        </h2>

        <ul class="space-y-3 mb-8">
          <li
            v-for="(feature, index) in selfHostedSection.features"
            :key="index"
            class="text-gray-300 flex items-center gap-2"
          >
            <svg
              class="h-5 w-5 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            {{ feature }}
          </li>
        </ul>

        <!-- Trial Section -->
        <div class="border-t border-gray-800 pt-6">
          <h3 class="text-xl font-semibold text-white mb-3">
            {{ selfHostedSection.trialTitle }}
          </h3>
          <p class="text-gray-400">
            {{ selfHostedSection.trialDescription }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
