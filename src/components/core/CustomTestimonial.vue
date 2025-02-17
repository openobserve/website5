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
const screenWidth = ref(window.innerWidth);

const updateScreenWidth = () => {
  screenWidth.value = window.innerWidth;
};

onMounted(() => {
  updateScreenWidth();
  window.addEventListener("resize", updateScreenWidth);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateScreenWidth);
});

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
  <div class="w-full mx-auto px-4 py-16">
    <h2 class="text-4xl font-bold text-center text-white pb-10">
      {{ screenWidth < 768 ? "Testimonials" : "Employee Testimonials" }}
    </h2>

    <div class="flex justify-center">
      <div v-if="screenWidth < 1024" class="w-full max-w-md">
        <swiper
          :modules="swiperModules"
          v-bind="swiperOptions"
          class="testimonial-swiper"
        >
          <swiper-slide
            v-for="testimonial in testimonials"
            :key="testimonial.id"
          >
            <div
              class="bg-[#1a1a1a] rounded-lg p-6 flex flex-col items-center text-center h-auto"
            >
              <CustomImage
                :image="testimonial.image"
                :altText="testimonial.name"
                class="w-20 h-20 rounded-full mb-4 object-cover"
              />
              <p class="text-gray-300 mb-4 text-base leading-relaxed">
                "{{ testimonial.description }}"
              </p>
              <h3 class="text-blue-400 font-semibold text-lg">
                {{ testimonial.name }}
              </h3>
              <p class="text-gray-400 text-sm">{{ testimonial.role }}</p>
            </div>
          </swiper-slide>
        </swiper>
      </div>

      <div v-else class="grid grid-cols-3 gap-6 max-w-5xl">
        <div
          v-for="(testimonial, index) in testimonials"
          :key="testimonial.id"
          class="bg-[#1a1a1a] rounded-lg p-6 flex flex-col items-center text-center relative pt-16 transition-all duration-300"
          :class="{
            'opacity-100 scale-100': index === currentSlide,
            'opacity-50 scale-95': index !== currentSlide,
          }"
        >
          <CustomImage
            :image="testimonial.image"
            :altText="testimonial.name"
            class="w-20 h-20 rounded-full object-cover absolute -top-12 left-1/2 transform -translate-x-1/2 border border-[#1a1a1a]"
          />
          <p class="text-gray-300 mb-4 text-lg leading-relaxed">
            "{{ testimonial.description }}"
          </p>
          <h3 class="text-blue-400 font-semibold text-lg">
            {{ testimonial.name }}
          </h3>
          <p class="text-gray-400 text-sm">{{ testimonial.role }}</p>
        </div>
      </div>
    </div>

    <div v-if="screenWidth >= 1024" class="flex justify-center mt-6 space-x-2">
      <button
        v-for="(_, index) in testimonials"
        :key="index"
        @click="goToSlide(index)"
        class="w-3 h-3 rounded-full transition-all duration-300"
        :class="index === currentSlide ? 'bg-blue-500' : 'bg-gray-600'"
      ></button>
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
