<script setup lang="ts">
import { onMounted, ref } from "vue";
import { defineProps } from "vue";

interface Video {
  thumbnail: string;
  label: string;
}
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface TrustedCompany {
  Image: {
    url: string;
    alternativeText: string;
  };
}

interface HeroData {
  badge: string;
  title: string;
  description: string;
  primaryButton: {
    text: string;
    link: string;
  };
  trustedText: string;
  trustedCompanies: TrustedCompany[];
  video: Video;
}

const props = defineProps<{ data: HeroData }>();

const player = ref<any>(null);

function onPlayerStateChange(event: any) {
  if (event.data === window.YT?.PlayerState.ENDED) {
    const overlay = document.getElementById("custom-overlay");
    overlay?.classList.remove("hidden");
  }
}

function replayVideo() {
  const overlay = document.getElementById("custom-overlay");
  overlay?.classList.add("hidden");
  player.value?.seekTo(0);
  player.value?.playVideo();
}

function onYouTubeIframeAPIReady() {
  player.value = new window.YT.Player("youtube-player", {
    width: "100%",
    height: "100%",
    videoId: "C0GH5Ox8NnY",
    playerVars: {
      rel: 0,
      modestbranding: 1,
      controls: 1,
    },
    events: {
      onStateChange: onPlayerStateChange,
    },
  });
}

onMounted(() => {
  // Load YouTube API
  if (!window.YT) {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    (window as any).onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
  } else {
    onYouTubeIframeAPIReady();
  }
});
</script>

<template>
  <section class="py-20 md:py-32 bg-primary-black">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-11">
      <div class="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
        <!-- Left Side -->
        <div class="flex flex-col h-full items-start justify-center gap-8">
          <div class="space-y-4">
            <span class="inline-block px-3 py-1 text-sm font-medium bg-green-400/50 text-white rounded-full mt-2">
              {{ data.badge }}
            </span>
            <h1 class="text-3xl font-bold tracking-tight sm:text-5xl text-white leading-tight">
              {{ data.title }}
            </h1>
            <h2 class="text-2xl font-medium text-gray-300 -mt-2">
              {{ data.description }}
            </h2>
          </div>

          <div class="flex flex-col sm:flex-row gap-4 mb-4">
            <a :href="data.primaryButton.link" target="_blank">
              <button
                class="bg-[#6b76e2] hover:bg-[#4f5ee8] text-white font-semibold py-3 px-6 rounded-lg text-lg cursor-pointer">
                {{ data.primaryButton.text }}
              </button>
            </a>
          </div>
        </div>

        <!-- Right Side (Video Card) -->
        <div class="relative" id="player-container">
          <div class="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-20 blur-lg">
          </div>

          <div class="relative rounded-xl overflow-hidden group cursor-pointer aspect-video w-full">
            <div id="youtube-player" class="w-full h-full"></div>

            <div id="custom-overlay"
              class="absolute inset-0 backdrop-blur-3xl bg-black/70 flex items-center justify-center z-20 hidden">
              <button @click="replayVideo" class="text-white bg-black p-3 rounded-full shadow-lg transition"
                aria-label="Replay video">
                <!-- Replay icon (e.g., Heroicons or any SVG) -->
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="lucide lucide-rotate-ccw-icon lucide-rotate-ccw">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Logos -->
      <div class="mt-12">
        <div class="text-sm md:text-lg xl:text-xl text-gray-400 mb-3">
          {{ data.trustedText }}
        </div>
        <div class="w-full overflow-hidden">
          <div class="flex gap-4 lg:gap-6 items-center animate-scroll">
            <div v-for="(logo, index) in [...data.trustedCompanies, ...data.trustedCompanies]" :key="index"
              class="flex-shrink-0 bg-gray-800 rounded-lg p-6 flex items-center justify-center h-12 md:h-16 w-auto">
              <img :src="logo.Image.url" :alt="logo.Image.alternativeText || 'Trusted Company Logo'"
                class="h-8" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>