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
  <div class="w-full mx-auto px-4 py-16">
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
        <swiper-slide v-for="testimonial in testimonials" :key="testimonial.id">
          <div
            class="bg-[#1a1a1a] rounded-lg p-6 flex flex-col items-center text-center h-auto"
          >
            <CustomImage
              :image="testimonial.image"
              :altText="testimonial.name"
              class="w-20 h-20 rounded-full mb-4 object-cover"
            />
            <p class="text-gray-300 mb-4 text-base leading-snug">
              "{{ testimonial.description }}"
            </p>
            <h3 class="text-blue-400 font-semibold text-lg">
              {{ testimonial.name }}
            </h3>
            <p class="text-gray-400 text-sm">{{ testimonial.role }}</p>
          </div>
        </swiper-slide>

        <!-- Navigation Arrows (Only Visible on Desktop) -->
        <div
          class="swiper-button-prev hidden md:flex absolute -left-10 top-1/2 transform -translate-y-1/2 z-20 opacity-60 hover:opacity-100 transition duration-300"
        ></div>
        <div
          class="swiper-button-next hidden md:flex absolute -right-10 top-1/2 transform -translate-y-1/2 z-20 opacity-60 hover:opacity-100 transition duration-300"
        ></div>
      </swiper>
    </div>
  </div>
</template>

<style>
.testimonial-swiper {
  padding-bottom: 40px !important;
}

/* Pagination Bullets */
.testimonial-swiper .swiper-pagination-bullet {
  background: #4b5563;
  opacity: 1;
}

.testimonial-swiper .swiper-pagination-bullet-active {
  background: #3b82f6;
}

/* Navigation Arrows (Hidden on Mobile, Visible on Desktop) */
.swiper-button-prev,
.swiper-button-next {
  width: 40px; /* Adjusted size */
  height: 40px;
  background: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    opacity 0.3s ease-in-out,
    background 0.3s ease-in-out;
}

/* Proper Positioning on Desktop */
@media (min-width: 1024px) {
  .swiper-button-prev {
    left: -50px; /* Adjusted for better alignment */
  }
  .swiper-button-next {
    right: -50px; /* Adjusted for better alignment */
  }
}

/* Hide Arrows on Mobile */
@media (max-width: 640px) {
  .swiper-button-prev,
  .swiper-button-next {
    display: none !important;
  }
}

/* Arrow Hover Effect */
.swiper-button-prev:hover,
.swiper-button-next:hover {
  background: rgba(0, 0, 0, 0.8);
  opacity: 1;
}

/* Swiper's Built-in Styling Tweaks */
:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  color: #ffffff;
}

:deep(.swiper-button-next::after),
:deep(.swiper-button-prev::after) {
  font-size: 16px; /* Proper icon size */
}

:deep(.swiper-button-disabled) {
  opacity: 0.3; /* Faint visibility when disabled */
  cursor: not-allowed;
}
</style>
