<script setup>
import { ref } from "vue";

const copied = ref(false);

// Define the docker command as a constant
const DOCKER_COMMAND = `docker run -d
-e ZO_ROOT_USER_EMAIL="root@example.com"
-e ZO_ROOT_USER_PASSWORD="Complexpass#123"
public.ecr.aws/zinclabs/openobserve:latest`;

const copyCode = () => {
  // Create a temporary textarea element
  const textarea = document.createElement("textarea");
  textarea.value = DOCKER_COMMAND;

  // Make the textarea invisible but keep it in the DOM
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  textarea.style.top = "0";

  // Add it to the DOM
  document.body.appendChild(textarea);

  try {
    // Select and copy the text
    textarea.select();
    document.execCommand("copy");
    copied.value = true;

    // Reset copy status after 1.5 seconds
    setTimeout(() => {
      copied.value = false;
    }, 1500);
  } catch (err) {
  } finally {
    // Clean up by removing the textarea
    document.body.removeChild(textarea);
  }
};
</script>

<template>
  <div
    class="relative bg-[#232628]/90 rounded-lg text-gray-300 font-mono text-xs sm:text-sm max-w-full w-full p-6 sm:p-8 mt-4 sm:mt-6"
  >
    <!-- Copy Button -->
    <button
      @click="copyCode"
      class="absolute top-2 right-2 text-white p-1 flex items-center focus:outline-none"
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

    <!-- Scrollable Code Block -->
    <div class="overflow-x-auto overflow-y-hidden custom-scrollbar">
      <pre class="whitespace-pre text-xs sm:text-sm break-words px-2 py-1">{{
        DOCKER_COMMAND
      }}</pre>
    </div>
  </div>
</template>

<style scoped>
/* Ensure horizontal scrolling */
.custom-scrollbar {
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  max-width: 100%;
}

/* Scrollbar styles */
.custom-scrollbar::-webkit-scrollbar {
  height: 6px; /* Ensure scrollbar visibility */
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #4d5257;
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #616265;
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #6b6e72;
}
</style>
