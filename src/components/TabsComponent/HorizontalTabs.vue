<template>
  <div>
    <div class="mt-8">
      <div
        v-for="tab in tabs"
        :key="'content-' + tab.value"
        v-show="activeTab === tab.value"
      >
        <div
          class="p-6 flex flex-col lg:flex-row items-center justify-between w-full gap-4"
        >
          <div class="w-full lg:w-1/2">
            <h2 class="text-2xl font-bold mb-2">{{ tab.title }}</h2>
            <p class="text-gray-600 mb-6" v-if="tab.description">
              {{ tab.description }}
            </p>
            <div class="">
              <ul class="space-y-2 mb-6">
                <li
                  v-for="(feature, index) in tab.items"
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
          <div class="w-full lg:w-1/2">
            <div
              class="w-full aspect-[16/9] p-3 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center cursor-zoom-in"
              @click="openPopup(tab.featureImage.url)"
            >
              <img
                :src="tab.featureImage.url"
                :alt="tab.featureImage.alternativeText||tab.title"
                class="w-full h-auto object-cover rounded-lg"
                style="image-rendering: auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ImagePopup
    :src="popupImageSrc"
    :visible="showPopup"
    @close="showPopup = false"
  />
</template>

<script setup>
import { CheckCircle } from "lucide-vue-next";
import ImagePopup from "@/components/core/ImagePopup.vue";
import { ref } from "vue";
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

const showPopup = ref(false);
const popupImageSrc = ref("");

function openPopup(src) {
  popupImageSrc.value = src;
  showPopup.value = true;
}
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
