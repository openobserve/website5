<script setup>
import CustomButton from "../core/CustomButton.vue";
import { ref, onMounted } from "vue";
import CustomSeprater from "../core/CustomSeprater.vue";

const props = defineProps({
  cloudSection: {
    type: Object,
    required: true,
  },
});

const formData = ref({});

// Initialize form data
onMounted(() => {
  props.formFields.forEach((field) => {
    formData.value[field.name] = field.type === "checkbox" ? false : "";
  });
});

const onSubmit = () => {
  // console.log("Form submitted with data:", formData.value);
};
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
        <h2 class="text-2xl font-semibold text-white mb-8">
          Create Free Account
        </h2>

        <form @submit.prevent="onSubmit" class="space-y-6">
          <div class="flex flex-col">
            <label class="text-white font-medium mb-1"> Name </label>
            <input
              type="text"
              placeholder="Enter Name"
              class="bg-[#23282C] border border-[#373a3d] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <!-- Checkbox -->
          <div class="flex items-start gap-3">
            <input
              type="checkbox"
              id="terms"
              v-model="formData.terms"
              class="mt-1"
            />
            <label for="terms" class="text-gray-600">
              I confirm I have read and agree to the
              <a href="#" class="text-blue-500 underline"
                >Terms and Conditions</a
              >.
            </label>
          </div>
          <CustomButton
            variant="primary"
            type="submit"
            class="py-3 transition-all duration-300 uppercase tracking-wide"
          >
            CREATE AN ACCOUNT
          </CustomButton>

          <CustomSeprater />

          <!-- Login Options -->
          <div class="pt-8">
            <p class="text-center text-gray-400 text-sm mb-4">Login With</p>
            <div class="flex justify-center gap-4">
              <button
                v-for="provider in [
                  'download-pricing/search.svg',
                  'download-pricing/Frame 2121314627.svg',
                  'download-pricing/microsoft.svg',
                ]"
                :key="provider"
                class="p-3 bg-[#2A2D31] rounded-lg hover:bg-[#32363B] transition-all duration-200 shadow-lg shadow-black/20"
              >
                <img
                  :src="`/${provider}`"
                  :alt="`${provider} login`"
                  class="h-6 w-6"
                />
              </button>
            </div>
          </div>
        </form>
      </div>
      <div class="bg-[#23282c]/40 rounded-lg p-8 border-r border-gray-800/50">
        <div class="mb-6">
          <h4 class="text-white text-xl font-medium py-5">
            Free Forever Access
          </h4>
        </div>

        <!-- Features List -->
        <div class="flex-grow">
          <ul class="space-y-4 mb-8">
            <li class="flex gap-3 text-gray-300">
              <span class="text-sm">10K metrics</span>
            </li>
            <li class="flex gap-3 text-gray-300">
              <span class="text-sm">50GB logs</span>
            </li>
            <li class="flex gap-3 text-gray-300">
              <span class="text-sm">50GB traces</span>
            </li>
            <li class="flex gap-3 text-gray-300">
              <span class="text-sm">50GB profiles</span>
            </li>
            <li class="flex gap-3 text-gray-300">
              <span class="text-sm">500VUh k6 testing</span>
            </li>
            <li class="flex gap-3 text-gray-300">
              <span class="text-sm">50k frontend sessions</span>
            </li>
            <li class="flex gap-3 text-gray-300">
              <span class="text-sm">3 active users</span>
            </li>
            <li class="flex gap-3 text-gray-300">
              <span class="text-sm">14 day retention</span>
            </li>
          </ul>
        </div>
        <div class="mb-6">
          <h4 class="text-white text-xl font-medium py-2">
            15 -day unlimited usage trial
          </h4>
          <p class="text-white text-xl font-medium py-2">
            Unlimited metrics, logs, and users, long-term retention, and premium
            team collaboration features.
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
