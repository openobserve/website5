<template>
  <div ref="sectionRef" :class="background ? 'bg-gray-50' : ''">
    <CustomSection sectionClass="!pb-0">
      <HeadingSection :title="title" :description="description" align="CENTER" />
      <div class="w-full">
        <div class="grid w-full grid-cols-2 md:grid-cols-4 h-auto p-0 bg-transparent gap-2">
          <button v-for="tab in tabs" :key="tab.value" @click="setActiveTab(tab.value)" :class="[
            'py-3 flex flex-col items-center gap-2 font-semibold transition-colors rounded-lg cursor-pointer',
            activeTab === tab.value
              ? 'bg-primary-purple text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
          ]">
            <img :src="tab.icon" :alt="tab.title + 'icon'" class="h-5 w-5" />
            <span>{{ tab.title }}</span>
          </button>
        </div>
          
        <div class="mt-8">
          <div v-for="tab in tabs" :key="'content-' + tab.value" v-show="activeTab === tab.value">
            <div
              class="bg-white rounded-lg shadow px-8 py-16 flex flex-col lg:flex-row items-center justify-between w-full gap-4">
              <div class="w-full lg:w-1/2">
                <h2 class="text-2xl font-bold mb-2">{{ tab.card.title }}</h2>
                <p class="text-gray-600 mb-6" v-if="tab.card.description">
                  {{ tab.card.description }}
                </p>
                <div class="">
                  <ul class="space-y-2 mb-6">
                    <li v-for="(feature, index) in tab.card.features" :key="index"
                      class="flex flex-col justify-start space-y-2 items-start">
                      <h3 class="text-lg font-semibold text-gray-800 mb-2" v-if="feature.title">
                        {{ feature.title }}
                      </h3>
                      <p class="text-gray-600 mb-2" v-if="feature.description">
                        {{ feature.description }}
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
              <!-- <div class="w-full md:w-1/2">
                <div
                  class="w-full rounded-lg"
                >
                  <img
                    :src="tab.card.image"
                    :alt="tab.card.title"
                    class="object-cover w-full h-full"
                  />
                </div>
              </div> -->

              <div class="w-full lg:w-1/2">
                <div
                  class="w-full aspect-[16/9] p-3 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center cursor-zoom-in" @click="openPopup(tab.card.image)">
                  <img :src="tab.card.image" :alt="tab.card.title" class="w-full h-auto object-cover rounded-lg"
                    style="image-rendering: auto;" />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </CustomSection>
  </div>
   <ImagePopup :src="popupImageSrc" :visible="showPopup" @close="showPopup = false" />
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import HeadingSection from "../core/HeadingSection.vue";
import CustomSection from "../core/CustomSection.vue";
import ImagePopup from '@/components/core/ImagePopup.vue' 

const props = defineProps({
  title: String,
  description: String,
  tabs: {
    type: Array,
    required: true,
  },
  background: {
    type: Boolean,
    required: false,
  },
});
const activeTab = ref(props.tabs[0]?.value || "");
const autoRotate = ref(true);
const sectionRef = ref(null);
const showPopup = ref(false)
const popupImageSrc = ref("")

function openPopup(src) {
  popupImageSrc.value = src
  showPopup.value = true
}
let interval = null;

// Function to move to the next tab
const rotateToNextTab = () => {
  const currentIndex = tabs.findIndex((tab) => tab.value === activeTab.value);
  const nextIndex = (currentIndex + 1) % tabs.length;
  activeTab.value = tabs[nextIndex].value;
};

const setActiveTab = (tabValue) => {
  activeTab.value = tabValue;
  if (autoRotate.value) {
    autoRotate.value = false;
  }
};

// Set up auto-rotation
onMounted(() => {
  if (autoRotate.value) {
    interval = setInterval(() => {
      rotateToNextTab();
    }, 3000);
  }

  const sectionElement = sectionRef.value;
  if (sectionElement) {
    sectionElement.addEventListener("click", handleInteraction);
    sectionElement.addEventListener("touchstart", handleInteraction);
  }
});

// Stop auto-rotation when user interacts with the section
const handleInteraction = () => {
  if (autoRotate.value) {
    autoRotate.value = false;
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  }
};

// Clean up
onBeforeUnmount(() => {
  if (interval) {
    clearInterval(interval);
  }

  const sectionElement = sectionRef.value;
  if (sectionElement) {
    sectionElement.removeEventListener("click", handleInteraction);
    sectionElement.removeEventListener("touchstart", handleInteraction);
  }
});
</script>

<style scoped>
/* Add any custom styles here if needed */
</style>
