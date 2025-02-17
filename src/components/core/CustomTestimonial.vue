<script setup>
import { ref } from "vue";
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
      <span class="md:hidden">Testimonials</span>
      <span class="hidden md:inline">Employee Testimonials</span>
    </h2>

    <div class="flex justify-center mt-[2vh]">
      <!-- Mobile View (Uses Swiper) -->
      <div class="w-full max-w-md lg:hidden">
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

      <!-- Desktop View (Grid Layout) -->
      <div class="hidden lg:grid grid-cols-3 gap-6 max-w-5xl mt-[2vh]">
        <div
          v-for="(testimonial, index) in testimonials"
          :key="testimonial.id"
          class="bg-[#1a1a1a] rounded-lg p-6 flex flex-col items-center text-center relative pt-16 transition-all duration-300"
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
