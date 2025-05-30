<script setup lang="ts">
import { defineProps } from "vue";

interface Video {
  thumbnail: string;
  label: string;
}

interface HeroData {
  badge: string;
  title: string;
  // subtitle: string;
  description: string;
  primaryButton: {
    text: string;
    link: string;
  };
  trustedText: string;
  trustedCompanies: {
    url: string;
    alt: string;
  }[];
  video: Video;
}

defineProps<{ data: HeroData }>();
</script>

<template>
  <section class="py-20 md:py-32 bg-primary-black">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-11">
      <div class="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
        <!-- Left Side -->
        <div class="flex flex-col h-full items-start justify-center gap-8">
          <div class="space-y-4 lg:space-y-4">
            <span
              class="inline-block px-3 py-1 text-sm font-medium bg-green-400/50 text-white rounded-full mt-2"
            >
              {{ data.badge }}
            </span>
            <h1
              class="text-3xl font-bold tracking-tight sm:text-5xl text-white leading-tight"
            >
              {{ data.title }}
            </h1>
            <h2 class="text-2xl font-medium text-gray-300 -mt-2">
              {{ data.description }}
            </h2>
            <!-- <p class="text-xl text-gray-400">
              {{ data.description }}
            </p> -->
          </div>

          <div class="flex flex-col sm:flex-row gap-4 mb-4">
            <a
              :href="data.primaryButton.link"
              target="_blank"
              class="cursor-pointer"
            >
              <button
                class="bg-[#6b76e2] hover:bg-[#4f5ee8] text-white font-semibold py-3 px-6 rounded-lg text-lg cursor-pointer"
              >
                {{ data.primaryButton.text }}
              </button>
            </a>
          </div>
        </div>

        <!-- Right Side (Video Card) -->
        <div class="relative">
          <div
            class="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-20 blur-lg"
          ></div>
          <div class="relative rounded-xl overflow-hidden group cursor-pointer">
            <div class="aspect-video w-full">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/C0GH5Ox8NnY?rel=0"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
                class="w-full h-full"
              ></iframe>
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
            <div
              v-for="(logo, index) in data.trustedCompanies"
              :key="index"
              class="flex-shrink-0 bg-gray-800 rounded-lg p-6 flex items-center justify-center h-12 md:h-16 w-auto"
            >
              <img :src="logo.url" :alt="logo.alt" class="h-8 w-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
