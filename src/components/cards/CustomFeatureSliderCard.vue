<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import CustomRoundShape from "../core/CustomRoundShape.vue";

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
        <div
          class="rounded-lg p-4 flex flex-col justify-center items-center text-center"
        >
          <CustomRoundShape
            :imgSrc="item.icon"
            iconSize="small"
            borderColor="bg-gradient-gray"
            size="small"
          />
          <h2 class="font-semibold text-base mb-2" :class="titleTextColor">
            {{ item.title }}
          </h2>
          <p class="text-sm" :class="descriptionTextColor">
            {{ item.description }}
          </p>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<style scoped>
.testimonial-swiper {
  padding-bottom: 40px !important;
}

.testimonial-swiper .swiper-pagination-bullet {
  background: #4b5563;
  opacity: 1;
}

.testimonial-swiper .swiper-pagination-bullet-active {
  background: #3b82f6;
}
</style>
