<template>
  <div>
    <!-- <div v-if="activeTab === tab.value" class="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">

        <div class="space-y-4">
          <span
            class="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium text-white bg-tabs-background text"
            :class="tab.badge.theme">
            {{ tab.badge.text }}
          </span>
          <h3 class="text-2xl font-bold">{{ tab.title }}</h3>
          <p class="text-gray-500">
            {{ tab.description }}
          </p>
          <ul class="space-y-2">
            <li v-for="(feature, index) in tab.features" :key="index" class="flex items-center gap-2">
              <CheckCircle class="h-5 w-5 text-primary-green" />
              <span>{{ feature }}</span>
            </li>
          </ul>
          <button
            class="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white transition-colors"
            :class="tab.button.class">
            {{ tab.button.text }}
          </button>
        </div>
        <div class="flex justify-center">
          <div class="h-auto w-full max-w-[500px] max-h-[400px] aspect-w-1 aspect-h-1">
            <img :src="tab.image?.url" :alt="tab.image?.alt" class="object-contain rounded-lg shadow-lg w-full h-full" />
          </div>
        </div>
      </div> -->
    <div class="mt-8">
      <div
        v-for="tab in tabs"
        :key="'content-' + tab.value"
        v-show="activeTab === tab.value"
      >
        <div
          class="p-6 flex flex-col md:flex-row items-center justify-between w-full gap-4"
        >
          <div class="w-full md:w-1/2">
            <h2 class="text-2xl font-bold mb-2">{{ tab.card.title }}</h2>
            <p class="text-gray-600 mb-6" v-if="tab.card.description">
              {{ tab.card.description }}
            </p>
            <div class="">
              <ul class="space-y-2 mb-6">
                <li
                  v-for="(feature, index) in tab.card.features"
                  :key="index"
                  class="flex flex-col justify-start space-y-2 items-start"
                >
                  <h3
                    class="text-lg font-semibold text-gray-800 mb-2"
                    v-if="feature.title"
                  >
                    {{ feature.title }}
                  </h3>
                  <p class="text-gray-600 mb-2" v-if="feature.description">
                    {{ feature.description }}
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div class="w-full md:w-1/2">
            <div class="relative w-full rounded-lg">
              <img
                :src="tab.card.image"
                :alt="tab.card.title"
                class="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { CheckCircle } from "lucide-vue-next";

defineProps({
  tabs: {
    type: Array,
    required: true,
  },
  activeTab: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.text {
  color: white;
  /* Replace with your primary green color */
}

/* Ensure consistent aspect ratio for images */
.aspect-w-1 {
  aspect-ratio: 1 / 1;
}
</style>
