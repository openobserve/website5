<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import CustomButton from "./CustomButton.vue";
import CustomImage from "./CustomImage.vue";

// Define props for reusability
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
});

// Active tab state
const activeTab = ref(props.items[0]); // Default to the first tab
const isMobile = ref(false);

// Function to handle tab switching
const selectTab = (tab) => {
  activeTab.value = tab;
};

const checkIfMobile = () => {
  isMobile.value = window.innerWidth < 768;
};

onMounted(() => {
  checkIfMobile();
  // console.log('mounted')
  window.addEventListener("resize", checkIfMobile);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkIfMobile);
});

</script>

<template>
  <div class="text-white py-8">
    <!-- Mobile View with Swiper -->
    <div v-if="isMobile" class="h-full">
      <swiper
        :modules="[Pagination]"
        :space-between="20"
        :slides-per-view="1"
        :pagination="{ clickable: true }"
        class="mobile-swiper h-full"
      >
        <swiper-slide v-for="tab in items" :key="tab.id" class="!h-auto">
          <div
            class="flex flex-col items-center space-y-6 p-4 rounded-lg h-full"
            style="background-color: rgba(53, 59, 64, 1)"
          >
            <!-- Text Content -->
            <div class="space-y-4 text-center h-full">
              <h1 class="text-3xl font-bold">{{ tab.title }}</h1>
              <p class="text-[#F4F4F5] leading-relaxed">
                {{ tab.description }}
              </p>
              <CustomButton variant="secondary" :buttonLink="tab.buttonLink">
                {{ tab.buttonText }}
              </CustomButton>
            </div>
            <div class="w-full flex justify-center">
              <CustomImage
                :image="tab.image?.url"
                :altText="tab.title"
                cssClass="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>

    <!-- Desktop View with Tabs -->
    <div v-else class="flex flex-row relative">
      <!-- Left Tabs Column -->
      <div class="w-1/3 lg:w-1/4 border-r border-gray-700 px-2">
        <div class="space-y-4">
          <template v-for="(tab,index) in items" :key="index">
            <button
              class="flex items-center px-2 py-2 text-left text-lg font-medium border-l-4 transition-all"
              :class="{
                'text-white gradient-border': activeTab.id === tab.id,
                'text-gray-400 border-transparent hover:text-white hover:border-gray-600':
                  activeTab.id !== tab.id,
              }"
              @click="selectTab(tab)"
            >
              {{ tab.title }}
            </button>
          </template>
        </div>
      </div>

      <!-- Right Content Area -->
      <div
        class="flex flex-row w-2/3 lg:w-3/4 items-center justify-between rounded-lg mx-10 p-6 space-x-3"
        style="background-color: rgba(53, 59, 64, 1)"
      >
        <!-- Text Content -->
        <div class="space-y-4 px-3 w-[40%]">
          <h1 class="text-lg font-bold md:text-2xl">{{ activeTab.title }}</h1>
          <p class="text-[#F4F4F5] leading-relaxed">{{ activeTab.description }}</p>
          <CustomButton variant="secondary" :buttonLink="activeTab.buttonLink" class="w-40">
            {{ activeTab.buttonText }}
          </CustomButton>
        </div>
        
        <!-- Image -->
        <div class="w-[60%] px-3">
          <CustomImage
            :image="activeTab.image"
            :altText="activeTab.title"
            cssClass="rounded-lg shadow-sm"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.mobile-swiper {
  padding-bottom: 40px !important;
}

.swiper-pagination-bullet {
  background: #4b5563 !important;
  opacity: 1 !important;
}

.swiper-pagination-bullet-active {
  background: #3b82f6 !important;
}

.button-color {
  background-color: linear-gradient(
    rgba(208, 251, 255, 1),
    rgba(119, 139, 255, 1)
  );
}
.gradient-border {
  border-image: linear-gradient(to bottom, rgb(var(--blue-light)), rgb(var(--blue-dark))) 1;
  
}

/* If you need to ensure the border stays solid and doesn't get broken by the gradient, 
   you can use this alternative method: */

</style>
