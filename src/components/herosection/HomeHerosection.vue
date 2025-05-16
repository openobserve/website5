<script setup lang="ts">
import { defineProps } from "vue";

interface Video {
  thumbnail: string;
  label: string;
}

interface HeroData {
  badge: string;
  title: string;
  description: string;
  primaryButton: {
    text: string;
    link: string;
  },
  trustedText: string;
  logos: {
    url: string;
    alt: string;
  }[];
  video: Video;
}

defineProps<{ data: HeroData }>();
</script>

<template>
  <section class="py-20 md:py-32 bg-primary-black ">

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-11">
      <div class="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
        <!-- Left Side -->
        <div class="space-y-8">
          <div class="space-y-4">
            <span
              class="inline-block px-3 py-1 text-sm font-medium bg-vibrant-red text-white hover:bg-vibrant-red/90 rounded-full">
              {{ data.badge }}
            </span>
            <h1 class="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white">
              {{ data.title }}
            </h1>
            <p class="text-xl text-gray-400">
              {{ data.description }}
            </p>
          </div>

          <div class="flex flex-col sm:flex-row gap-4">
            <button class="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg text-lg">
              {{ data.primaryButton.text }}
            </button>
          </div>
        </div>


        
        <!-- Right Side (Video Card) -->
        <div class="relative">
          <div class="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-20 blur-lg">
          </div>
          <div class="relative rounded-xl overflow-hidden group cursor-pointer">
            <div class="aspect-video w-full">
              <img :src="data.video.thumbnail" alt="OpenObserve Demo Video" class="object-cover w-full h-full" />
            </div>
            <div
              class="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
              <div
                class="h-16 w-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg class="h-8 w-8 text-purple-500 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <p class="text-white font-medium">
                {{ data.video.label }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Logos -->
      <div class="mt-12">
        <div class="text-sm text-gray-400 mb-3">
          {{ data.trustedText }}
        </div>
        <div class="w-full overflow-hidden">
          <div class="flex gap-6 items-center animate-scroll">
            <div v-for="(logo, index) in data.logos" :key="index"
              class="flex-shrink-0 bg-gray-800 rounded-lg p-3 flex items-center justify-center h-12 w-32">
              <img :src="logo.url" :alt="logo.alt" class="h-6 w-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
