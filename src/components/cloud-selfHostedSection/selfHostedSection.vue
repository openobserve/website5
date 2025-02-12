<script setup>
import CustomButton from "../core/CustomButton.vue";
import { ref } from "vue";
import CustomSeprater from "../core/CustomSeprater.vue";

const props = defineProps({
  cloudSection: {
    type: Object,
    required: true,
  },
});

const copied = ref(false);

const copyCode = () => {
  const codeBlock = document.querySelector("code").innerText;
  navigator.clipboard.writeText(codeBlock).then(() => {
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 1500);
  });
};
</script>

<template>
  <div class="w-full container mx-auto">
    <!-- Content Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Cloud Section -->
      <div class="bg-[#23282c]/40 rounded-lg p-3 md:p-8 border-r border-gray-800/50">
        <h2 class="text-xl md:text-2xl font-semibold text-white mb-4 md:mb-8">Open Source</h2>
        <div class="flex-grow">
          <ul class="space-y-4 mb-4 md:mb-8">
            <li class="flex gap-3 text-gray-300">
              <span>
                <img src="/download-pricing/docker.svg" alt="icon" class="w-5 md:w-6 h-5 md:h-6"/></span>
              <span class="text-sm flex items-center">Docker</span>
            </li>
          </ul>
        </div>

        <!-- Copyable Code Block -->
        <div
          class="relative bg-gray-800 rounded-lg p-4 text-gray-300 font-mono text-md"
        >
          <button
            @click="copyCode"
            class="absolute top-2 right-2 text-white p-1 flex items-center focus:outline-none focus:ring-0"
          >
            <img
              :src="
                copied
                  ? '/download-pricing/copiedIcon.svg'
                  : '/download-pricing/copyIcon.svg'
              "
              alt="copy icon"
              class="w-4 h-4"
            />
          </button>
          <pre><code ref="codeBlock">
        docker run -d \
          <!-- --name openobserve \
          -v $PWD/data:/data \
          -p 5080:5080 \ -->
          -e ZO_ROOT_USER_EMAIL="root@example.com" \
          -e ZO_ROOT_USER_PASSWORD="Complexpass#123" \
          public.ecr.aws/zinclabs/openobserve:latest`,
          </code></pre>
        </div>
        <div class="flex-grow">
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
        <h2 class="text-md md:text-lg font-semibold text-white mb-8">
          Binaries can be downloaded from
          <a
            href="https://github.com/openobserve/openobserve/releases"
            class="text-[#0ea5e9] hover:underline"
            >releases</a
          >
          page for the appropriate platform.
        </h2>

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
      <div class="bg-[#23282c]/40 rounded-lg p-3 md:p-8 border-r border-gray-800/50">
        <div class="mb-6">
          <h4 class="text-white text-xl md:text-2xl font-medium mb-4 md:mb-4">Enterprise</h4>
          <p class="text-white text-sm md:text-md font-medium">
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
          <h4 class="text-white text-base md:text-lg font-medium py-2">
            Take charge of your observability with zero upfront costs.
          </h4>
        </div>
        <!-- <div>
          <CustomButton variant="primary"> DOCUMENATION </CustomButton>
        </div> -->
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
