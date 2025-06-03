<template>
  <div class="mx-4 w-full space-y-4">
    <div class="border rounded-lg p-4 space-y-4">
      <h3 class="text-2xl font-bold">{{ data.title }}</h3>
      <div class="flex-grow">
        <ul class="space-y-4 mb-4 md:mb-8">
          <li class="flex gap-3 text-gray-500">
            <span>
              <img
                src="/img/icon/docker.svg"
                alt="icon"
                class="w-5 md:w-6 h-5 md:h-6"
            /></span>
            <span class="text-lg lex items-center text-black">Docker</span>
          </li>
        </ul>
      </div>

      <!-- Copyable Code Block -->
      <div>
        <DockerCode :command="data.dockerCommand" />
      </div>

      <!-- static icon for downloads -->
      <div class="flex-grow mt-6">
        <ul class="space-y-4 py-4">
          <li class="text-gray-500">
            <div class="flex gap-3 items-center">
              <span>
                <img
                  src="/img/icon/downloading.svg"
                  alt="icon"
                  class="w-5 md:w-6 h-5 md:h-6 "
                />
              </span>
              <span class="text-lg font-medium text-black">Downloads</span>
            </div>
            <div
              class="text-md font-normal text-gray-600 mt-2"
              v-html="data.downloadTitle"
            ></div>
          </li>
        </ul>
      </div>
      <div class="flex-grow">
        <ul class="space-y-4 pb-[2vh]">
          <li class="text-gray-500">
            <div class="flex gap-3 items-center">
              <span>
                <img
                  src="/img/icon/ha-clustering.svg"
                  alt="icon"
                  class="w-4 md:w-5 h-4 md:h-5"
                />
              </span>
              <span class="text-lg font-medium text-black">High Availability(HA) Deployment</span>
            </div>
            <div
              class="text-md font-normal text-gray-600 mt-2 v-html-content"
              v-html="data.haDeploymentDescription"
            ></div>
          </li>
        </ul>
      </div>

    </div>
    <div class="border rounded-lg p-4 space-y-4">
      <h3 class="text-2xl font-bold">{{ data.enterpriseTitle }}</h3>
      <p class="text-gray-500">{{ data.enterpriseDescription }}</p>

      <ul class="space-y-2">
        <li
          v-for="feature in data.enterpriseFeatures"
          :key="feature.id"
          class="flex items-center gap-2"
        >
          <Check class="h-5 w-5 text-primary-purple" />
          <span>{{ feature.title }}</span>
        </li>
      </ul>

      <p class="text-gray-500" v-html="data.downloadTitle" />
      <p class="text-gray-500" v-html="data.haDeploymentDescription" />
      <p class="text-gray-500 v-html-content" v-html="data.enterpriseBottomDescription" />

      <a :href="data.selfHostedButton.link" target="_blank">
        <button
          class="bg-primary-purple hover:bg-dark-purple text-white w-full px-4 py-2 rounded-md cursor-pointer"
        >
          {{ data.selfHostedButton.text }}
        </button>
      </a>
    </div>
  </div>
</template>

<script setup>
import { Check } from "lucide-vue-next";
import DockerCode from "./DockerCode.vue";
defineProps({ data: Object });
</script>
<style scoped>

/*  */
:deep(.v-html-content a) {
  color: #3b82f6;
  text-decoration: underline;
}

/* Remove underline for <a> inside buttons */
:deep(button a) {
  text-decoration: none;
  color: inherit;
}
</style>