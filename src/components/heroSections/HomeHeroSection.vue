<script setup>
import { defineProps, ref, computed, onUnmounted } from "vue";
import VueTyping from "@dmncodes/vue-typing";
import CustomButton from "../core/CustomButton.vue";
import DockerCode from "../core/DockerCode.vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  primaryButton: {
    type: Object,
    required: true,
  },
  secondaryButton: {
    type: Object,
    default: () => ({}),
  },
  backgroundVideo: {
    type: String,
    required: false,
  },
});

// Convert title (with <br/> tags) into an array of sentences for VueTyping
const sentences = computed(() => props.title.split("<br/>"));

// Reactive state for modal visibility
const showDialog = ref(false);
const isLoading = ref(false); // Track loading state

// Toggle dialog visibility
const openDialog = () => {
  showDialog.value = true;
  isLoading.value = true; // Start loading before iframe appears
  window.addEventListener("keydown", handleKeydown);
};

const closeDialog = () => {
  showDialog.value = false;
  isLoading.value = false;
  window.removeEventListener("keydown", handleKeydown);
};

// Handle Escape key press
const handleKeydown = (event) => {
  if (event.key === "Escape") {
    closeDialog();
  }
};

// Ensure event listener cleanup
onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});
const getEmbedUrl = (url) => {
  if (!url) return "";

  // Extract video ID from short URL or normal YouTube link
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:.*v=|embed\/|v\/|shorts\/))([^?&]+)/
  );

  if (match && match[1]) {
    return `https://www.youtube.com/embed/${match[1]}?autoplay=1&rel=0`;
  }
  return "";
};
</script>

<template>
  <section
    class="relative flex items-start justify-center min-h-screen px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden text-white text-center lg:text-left"
  >
    <!-- Background Video -->
    <div>
      <video
        v-if="backgroundVideo"
        class="absolute inset-x-0 top-20 w-full h-full object-cover"
        autoplay
        loop
        muted
        playsinline
      >
        <source :src="backgroundVideo?.url" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div class="absolute inset-0 bg-black bg-opacity-50"></div>
    </div>

    <!-- Main Content -->
    <div
      class="relative z-10 flex flex-col lg:flex-row items-start justify-between w-full mx-auto pt-16 md:pt-[10vh] px-4 sm:px-6 lg:px-8 space-y-10 lg:space-y-0"
    >
      <!-- Left Content -->
      <div
        class="w-full lg:w-1/2 flex flex-col space-y-6 text-center lg:text-left"
      >
        <!-- Typing Effect -->
        <VueTyping
          class="text-white text-xl sm:text-2xl md:text-3xl xl:text-5xl font-bold leading-[2.5rem] md:leading-[2.8rem] lg:leading-[3.3rem] xl:leading-[4.2rem]"
          :sentences="sentences"
          :minTypeSpeed="150"
          :maxTypeSpeed="150"
          :eraseSpeed="50"
          :eraseDelay="1000"
          :writeDelay="0"
          caret="|"
          caretClass="custom-caret"
          :loop="true"
        />

        <h2
          class="text-base sm:text-md md:text-lg opacity-80"
          v-html="description"
        ></h2>

        <!-- Buttons -->
        <div
          class="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center lg:justify-start"
        >
          <CustomButton
            variant="primary"
            class="w-full sm:w-auto px-6 py-3 md:text-lg"
            :buttonLink="primaryButton.link"
            target="_blank"
          >
            {{ primaryButton.text }}
          </CustomButton>
          <CustomButton
            v-if="secondaryButton.text"
            variant="secondary"
            class="w-full sm:w-auto px-6 py-3 md:text-lg"
            @click="openDialog"
          >
            {{ secondaryButton.text }}
          </CustomButton>
        </div>
      </div>

      <!-- Right Content (DockerCode) -->
      <div class="w-full lg:w-1/2 flex justify-center lg:justify-end sm:px-0">
        <DockerCode class="w-full max-w-xs sm:max-w-md md:max-w-lg" />
      </div>
    </div>
    <!-- Video Dialog -->
    <div
      v-if="showDialog"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50 h-screen"
      @click="closeDialog"
    >
      <button
        class="absolute top-3 right-3 text-white cursor-pointer z-50"
        @click="closeDialog"
      >
        ✖
      </button>
      <!-- Spinner -->
      <div
        v-if="isLoading"
        class="absolute inset-0 flex items-center justify-center"
      >
        <div
          class="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"
        ></div>
      </div>
      <div
        class="relative p-8 md:p-[5rem] rounded-lg md:h-screen w-full max-w-4xl flex items-center justify-center"
      >
        <!-- Iframe Video -->
        <iframe
          v-if="secondaryButton?.link"
          :src="getEmbedUrl(secondaryButton.link)"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          class="w-full h-full rounded-lg object-contain"
          @click.stop
          @load="isLoading = false"
        ></iframe>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes blink {
  50% {
    opacity: 0;
  }
}
:deep(.dmn-typing span.caret) {
  color: #a5a7a9 !important; /* Tailwind gray-600 */
  font-weight: 300 !important;
  font-size: 1em !important;
  animation: blink 1s infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}
</style>
