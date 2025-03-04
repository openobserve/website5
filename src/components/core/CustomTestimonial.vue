<script setup>
import { ref, onMounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import CustomImage from "./CustomImage.vue";

const props = defineProps({
  testimonials: {
    type: Array,
    required: true,
  },
});

const swiperRef = ref(null); // Reference to Swiper instance

const swiperModules = [Pagination, Navigation];

const swiperOptions = {
  slidesPerView: 1,
  spaceBetween: 20,
  pagination: {
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    1024: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },
};

onMounted(() => {
  if (swiperRef.value) {
    swiperRef.value.swiper.update(); // Ensure Swiper updates correctly
  }
});
</script>

<template>
  <div class="w-full mx-auto">
    <h2 class="text-4xl font-bold text-center text-white pb-10">
      <span class="md:hidden">Testimonials</span>
      <span class="hidden md:inline">Employee Testimonials</span>
    </h2>

    <div class="relative w-full max-w-5xl mx-auto">
      <!-- Swiper for Both Mobile & Desktop -->
      <swiper
        ref="swiperRef"
        :modules="swiperModules"
        v-bind="swiperOptions"
        class="testimonial-swiper"
      >
        <swiper-slide v-for="testimonial in testimonials" :key="testimonial.id" class="!h-auto">
          <div
            class="bg-[#1a1a1a] rounded-lg p-6 flex flex-col items-center text-center h-full"
          >
            <CustomImage
              :image="testimonial.image"
              class="w-20 h-20 rounded-full mb-4 object-cover"
            />
            <p class="text-gray-300 mb-4 text-base leading-snug flex-1">
              "{{ testimonial.description }}"
            </p>
            <h3 class="text-blue-400 font-semibold text-lg">
              {{ testimonial.name }}
            </h3>
            <p class="text-gray-400 text-sm">{{ testimonial.role }}</p>
          </div>
        </swiper-slide>

        <!-- Navigation Arrows (Both Mobile & Desktop) -->
        <!-- <div
          class="swiper-button-prev absolute left-2 top-1/2 transform -translate-y-1/2 z-20"
        ></div>
        <div
          class="swiper-button-next absolute right-2 top-1/2 transform -translate-y-1/2 z-20"
        ></div> -->
      </swiper>
    </div>
  </div>
</template>

<style>
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

/* Customize Navigation Arrows */
.swiper-button-prev,
.swiper-button-next {
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border-radius: 50%;
}

.swiper-button-prev:hover,
.swiper-button-next:hover {
  background: rgba(0, 0, 0, 0.8);
}

:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  color: #ffffff;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

:deep(.swiper-button-next::after),
:deep(.swiper-button-prev::after) {
  font-size: 20px;
}

:deep(.swiper-button-disabled) {
  opacity: 0.35;
  cursor: not-allowed;
}
</style>
