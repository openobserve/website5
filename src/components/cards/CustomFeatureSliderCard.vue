<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import CustomRoundShapeLandingPage from "../core/CustomRoundShapeLandingPage.vue";

// Props to receive card data and optional styling
const props = defineProps({
  cards: {
    type: Array,
    required: true,
  },
  titleTextColor: {
    type: String,
    default: "text-[#E2E3E5]",
    required: false,
  },
  descriptionTextColor: {
    type: String,
    default: "text-[#BEC0C2]",
    required: false,
  },
});
const swiperModules = [Pagination];
const swiperOptions = {
  slidesPerView: 1,
  spaceBetween: 20,
  pagination: {
    clickable: true,
  },
};
</script>

<template>
  <div>
    <swiper
      class="testimonial-swiper w-full"
      :modules="swiperModules"
      v-bind="swiperOptions"
    >
      <swiper-slide
        v-for="(item, index) in cards"
        :key="index"
        class="!w-full px-2"
      >
        <div class="rounded-lg flex flex-row space-x-2 items-start">
          <div class="h-14">
            <CustomRoundShapeLandingPage
              :imgSrc="item.image"
              iconSize="small"
              size="small"
            />
          </div>
          <div class="flex flex-col space-y-1">
            <h2 class="font-semibold text-base" :class="titleTextColor">
              {{ item.title }}
            </h2>
            <p class="text-sm" :class="descriptionTextColor">
              {{ item.description }}
            </p>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<style scoped>
.testimonial-swiper {
  padding-bottom: 30px !important;
}

.testimonial-swiper .swiper-pagination-bullet {
  background: #4b5563;
  opacity: 1;
}

.testimonial-swiper .swiper-pagination-bullet-active {
  background: #3b82f6;
}
</style>
