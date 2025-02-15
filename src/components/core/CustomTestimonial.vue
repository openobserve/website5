<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import CustomImage from "./CustomImage.vue";

const props = defineProps({
  testimonials: {
    type: Array,
    required: true,
  },
});

const currentSlide = ref(0);
const isMobile = ref(false);

const checkIfMobile = () => {
  isMobile.value = window.innerWidth < 768;
};

onMounted(() => {
  checkIfMobile();
  window.addEventListener("resize", checkIfMobile);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkIfMobile);
});

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % props.testimonials.length;
};

const prevSlide = () => {
  currentSlide.value =
    currentSlide.value === 0
      ? props.testimonials.length - 1
      : currentSlide.value - 1;
};

const goToSlide = (index) => {
  currentSlide.value = index;
};

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
  <div class="w-full mx-auto px-2 py-16 overflow-visible">
    <h2 class="text-4xl font-bold text-center text-white pb-20">
      {{ isMobile ? "Testimonials" : "Employee Testimonials" }}
    </h2>
    <!-- Mobile Swiper View -->
    <div v-if="isMobile" class="md:hidden">
      <swiper
        :modules="swiperModules"
        v-bind="swiperOptions"
        class="testimonial-swiper"
      >
        <swiper-slide v-for="testimonial in testimonials" :key="testimonial.id">
          <div
            class="bg-[#1a1a1a] rounded-lg p-6 flex flex-col items-center text-center"
          >
            <CustomImage
              :image="testimonial.image"
              :altText="testimonial.name"
              cssClass="w-20 h-20 rounded-full mb-6 object-cover"
            />
            <p class="text-gray-300 mb-6 text-lg leading-relaxed line-clamp-5">
              "{{ testimonial.description }}"
            </p>
            <h3 class="text-blue-400 font-semibold text-lg mb-1">
              {{ testimonial.name }}
            </h3>
            <p class="text-gray-400">{{ testimonial.role }}</p>
          </div>
        </swiper-slide>
      </swiper>
    </div>

    <!-- Desktop Grid View -->
    <div v-else class="hidden md:block relative">
      <div class="flex justify-center">
        <div class="grid grid-cols-3 gap-2">
          <div
            v-for="(testimonial, index) in testimonials"
            :key="testimonial.id"
            class="bg-[#1a1a1a] rounded-lg p-6 flex flex-col items-center text-center relative pt-16"
            :class="{
              'opacity-100 scale-100': index === currentSlide,
              'opacity-50 scale-95': index !== currentSlide,
            }"
          >
            <CustomImage
              :image="testimonial.image"
              :altText="testimonial.name"
              cssClass="w-20 h-20 rounded-full object-cover absolute -top-12 left-1/2 transform -translate-x-1/2 border border-[#1a1a1a] "
            />
            <p class="text-gray-300 mb-6 text-lg leading-relaxed">
              {{ testimonial.description }}
            </p>
            <h3 class="text-blue-400 font-semibold text-lg mb-1">
              {{ testimonial.name }}
            </h3>
            <p class="text-gray-400">{{ testimonial.role }}</p>
          </div>
        </div>
      </div>

      <!-- Navigation Dots -->
      <div class="flex justify-center mt-8 space-x-2">
        <button
          v-for="(_, index) in testimonials"
          :key="index"
          @click="goToSlide(index)"
          class="w-3 h-3 rounded-full transition-all duration-300"
          :class="index === currentSlide ? 'bg-blue-500' : 'bg-gray-600'"
        ></button>
      </div>
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
</style>
