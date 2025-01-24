<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

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
  <div class="w-full max-w-7xl mx-auto px-4 py-16">
    <h2 class="text-4xl font-bold text-center text-white mb-12">
      Employee Testimonials
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
            <img
              :src="testimonial.image"
              :alt="testimonial.name"
              class="w-20 h-20 rounded-full mb-6 object-cover"
            />
            <p class="text-gray-300 mb-6 text-lg leading-relaxed">
              "{{ testimonial.quote }}"
            </p>
            <h3 class="text-blue-400 font-semibold text-lg mb-1">
              {{ testimonial.name }}
            </h3>
            <p class="text-gray-400">{{ testimonial.position }}</p>
          </div>
        </swiper-slide>
      </swiper>
    </div>

    <!-- Desktop Grid View -->
    <div v-else class="hidden md:block relative">
      <div class="flex overflow-hidden">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="(testimonial, index) in testimonials"
            :key="testimonial.id"
            class="bg-[#1a1a1a] rounded-lg p-6 flex flex-col items-center text-center transform transition-all duration-300"
            :class="{
              'opacity-100 scale-100': index === currentSlide,
              'opacity-50 scale-95': index !== currentSlide,
            }"
          >
            <img
              :src="testimonial.image"
              :alt="testimonial.name"
              class="w-20 h-20 rounded-full mb-6 object-cover"
            />
            <p class="text-gray-300 mb-6 text-lg leading-relaxed">
              "{{ testimonial.quote }}"
            </p>
            <h3 class="text-blue-400 font-semibold text-lg mb-1">
              {{ testimonial.name }}
            </h3>
            <p class="text-gray-400">{{ testimonial.position }}</p>
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
