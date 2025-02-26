<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import CustomRoundShapeSubPage from "../core/CustomRoundShapeSubPage.vue";
import CustomSection from "../core/CustomSection.vue";

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
});

const swiperModules = [Pagination];
const swiperOptions = {
  slidesPerView: 1,
  spaceBetween: 16,
  pagination: {
    clickable: true,
  },
};
</script>

<template>
  <CustomSection section-class="xl:px-0 relative overflow-hidden">
    <div class="relative w-full -mt-10 lg:-mt-12">
      <!-- Background image -->
      <img
        alt="Bottom decoration"
        class="absolute w-screen h-screen bg-black/80 rounded-3xl"
        src="/img/bg/gradient-bg/glass-bg.svg"
      />

      <!-- Desktop Layout (Flexbox) -->
      <div
        class="relative hidden lg:flex flex-row w-full justify-center mt-10 px-3 gap-4"
      >
        <div
          v-for="(item, index) in items"
          :key="index"
          class="flex flex-row gap-2"
        >
          <CustomRoundShapeSubPage
            :imgSrc="item.image"
            iconSize="small"
            size="small"
            class="shrink-0"
          />
          <div class="flex flex-col items-start">
            <h2 class="font-semibold text-2xl mb-2 text-white">
              {{ item.title }}
            </h2>
            <p class="text-sm md:text-base text-gray-300">
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- Mobile Layout (Swiper) -->
       <div>
        
       </div>
      <div class="relative block lg:hidden w-full mt-10 px-3">
        <swiper
          class="custom-feature-swiper w-full"
          :modules="swiperModules"
          v-bind="swiperOptions"
        >
          <swiper-slide v-for="(item, index) in items" :key="index">
            <div class="flex flex-col items-center text-center px-4">
              <CustomRoundShapeSubPage
                :imgSrc="item.image"
                iconSize="small"
                size="small"
              />
              <h2 class="font-semibold text-2xl mt-2 mb-2 text-white">
                {{ item.title }}
              </h2>
              <p class="text-sm text-gray-300">
                {{ item.description }}
              </p>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </CustomSection>
</template>

<style scoped>
.custom-feature-swiper {
  padding-bottom: 40px !important;
}
.custom-feature-swiper .swiper-pagination-bullet {
  background: #4b5563;
  opacity: 1;
}
.custom-feature-swiper .swiper-pagination-bullet-active {
  background: #3b82f6;
}
</style>
