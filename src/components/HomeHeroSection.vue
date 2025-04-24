<script setup lang="ts">
import { Play } from "lucide-vue-next";

const logos = [
  "/abstract-geometric-logo.png",
  "/modern-tech-workspace.png",
  "/abstract-growth.png",
  "/abstract-corporate-logo.png",
  "/digital-skyline.png",
  "/abstract-software-logo.png",
];

// Duplicate the logos array for continuous scrolling effect
const repeatedLogos = [...logos, ...logos];
</script>

<template>
  <div class="container mx-auto flex min-h-screen flex-col">
    <main class="flex-1">
      <section class="relative overflow-hidden py-20 md:py-32">
        <div class="absolute inset-0 bg-primary-black -z-10"></div>
        <div
          class="absolute inset-0 opacity-20 -z-10 bg-[radial-gradient(#444_1px,transparent_1px)] [background-size:16px_16px]"
        ></div>
        <div class="container relative">
          <div class="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
            <div class="space-y-8">
              <div class="space-y-4">
                <span
                  class="inline-block px-3 py-1 text-sm bg-vibrant-red text-white rounded hover:bg-vibrant-red/90"
                >
                  140x Lower Cost
                </span>
                <h1
                  class="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white"
                >
                  Modern observability for modern apps
                </h1>
                <p class="text-xl text-primary-gray">
                  Open-source observability platform designed for modern
                  applications—powerful visibility at a fraction of the cost
                </p>
              </div>

              <div class="flex flex-col sm:flex-row gap-4">
                <button
                  class="bg-vibrant-red hover:bg-vibrant-red/90 text-white px-6 py-3 text-lg rounded"
                >
                  Get Started For Free
                </button>
              </div>
            </div>

            <div class="relative">
              <div
                class="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary-blue to-primary-purple opacity-20 blur-lg"
              ></div>
              <div
                class="relative rounded-xl overflow-hidden group cursor-pointer"
              >
                <div class="aspect-video w-full">
                  <img
                    src="/modern-observability-dashboard.png"
                    alt="OpenObserve Demo Video"
                    class="object-cover w-full h-full"
                  />
                </div>
                <div
                  class="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors"
                >
                  <div
                    class="h-16 w-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform"
                  >
                    <Play class="h-8 w-8 text-primary-purple ml-1" />
                  </div>
                </div>
                <div
                  class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4"
                >
                  <p class="text-white font-medium">
                    See OpenObserve in action
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-12">
            <div class="text-sm text-primary-gray mb-3">
              Trusted by thousands of developers worldwide
            </div>
            <div class="w-full overflow-hidden">
              <div class="flex gap-6 items-center animate-scroll">
                <template v-for="(logo, index) in repeatedLogos" :key="index">
                  <div
                    class="flex-shrink-0 bg-gray-800 rounded-lg p-3 flex items-center justify-center h-12 w-32"
                  >
                    <img :src="logo" alt="Company logo" class="h-6 w-auto" />
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
@keyframes scroll {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
}

.animate-scroll {
  animation: scroll 30s linear infinite;
}
</style>
