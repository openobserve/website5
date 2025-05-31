<script setup>
import { ref } from "vue";
const props = defineProps({
  command: String
})
const copied = ref(false);

// Define the docker command as a constant
const DOCKER_COMMAND = `docker run 
  -e ZO_ROOT_USER_EMAIL="root@example.com"
  -e ZO_ROOT_USER_PASSWORD="Complexpass#123"
  public.ecr.aws/zinclabs/openobserve:latest`;

const copyCode = () => {
  const textarea = document.createElement("textarea");
  textarea.value = DOCKER_COMMAND;
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  textarea.style.top = "0";
  document.body.appendChild(textarea);

  try {
    textarea.select();
    document.execCommand("copy");
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 1500);
  } catch (err) {
  } finally {
    document.body.removeChild(textarea);
  }
};
</script>

<template>
  <div
    class="relative bg-[#f0f0f0] rounded-lg text-black font-mono text-xs sm:text-sm w-full p-4copied mt-4 sm:mt-6 flex flex-col"
  >
    <!-- Copy Button -->
    <button
      @click="copyCode"
      class="absolute top-1 right-1 md:top-3 md:right-3 sm:top-4 sm:right-4 bg-gray-700 hover:bg-gray-600 p-2 rounded-lg shadow-lg transition"
    >
      <img
        v-show="copied"
        src="/img/icon/copiedIcon.svg"
        alt="copy icon"
        class="w-4 h-4 md:w-5 md:h-5"
      />
      <img
        v-show="!copied"
        src="/img/icon/copyIcon.svg"
        alt="copy icon"
        class="w-4 h-4 md:w-5 md:h-5"
      />
    </button>

    <!-- Scrollable Code Block -->
    <div class="overflow-x-auto overflow-y-hidden custom-scrollbar">
      <pre
        class="text-left whitespace-pre text-xs sm:text-base break-words px-2 py-1"
        >{{ command }}</pre
      >
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