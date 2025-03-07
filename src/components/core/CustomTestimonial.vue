<script setup>
import { ref, onMounted, computed } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import CustomImage from "./CustomImage.vue";

// Props
const props = defineProps({
  testimonials: {
    type: Array,
    required: true,
  },
});

// Swiper Configuration (Encapsulated in a function for maintainability)
const useSwiper = () => {
  const swiperRef = ref(null);
  const swiperModules = [Pagination, Navigation];

  const swiperOptions = {
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: { clickable: true },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      1024: { slidesPerView: 3, spaceBetween: 30 },
    },
  };

  onMounted(() => {
    swiperRef.value?.swiper.update(); // Ensure Swiper updates correctly
  });

  return { swiperRef, swiperModules, swiperOptions };
};

const { swiperRef, swiperModules, swiperOptions } = useSwiper();

// Computed Properties for Readability
const titleText = computed(() => ({
  mobile: "Testimonials",
  desktop: "Employee Testimonials",
}));
</script>

<template>
  <div class="w-full mx-auto">
    <!-- Section Title -->
    <h2 class="text-4xl font-bold text-center text-white pb-10">
      <span class="md:hidden">{{ titleText.mobile }}</span>
      <span class="hidden md:inline">{{ titleText.desktop }}</span>
    </h2>

    <div class="relative w-full max-w-5xl mx-auto">
      <!-- Swiper Component -->
      <swiper ref="swiperRef" :modules="swiperModules" v-bind="swiperOptions" class="testimonial-swiper">
        <swiper-slide v-for="testimonial in testimonials" :key="testimonial.id" class="!h-auto">
          <div class="testimonial-card">
            <CustomImage :image="testimonial.image" class="testimonial-avatar" />
            <p class="testimonial-description">
              "{{ testimonial.description }}"
            </p>
            <h3 class="testimonial-name">{{ testimonial.name }}</h3>
            <p class="testimonial-role">{{ testimonial.role }}</p>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<style scoped>
/* Swiper Styles */
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

/* Testimonial Card */
.testimonial-card {
  background: #1a1a1a;
  border-radius: 8px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100%;
}

.testimonial-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 16px;
  object-fit: cover;
}

.testimonial-description {
  color: #d1d5db;
  margin-bottom: 16px;
  font-size: 1rem;
  line-height: 1.5;
  flex: 1;
}

.testimonial-name {
  color: #3b82f6;
  font-weight: 600;
  font-size: 1.125rem;
}

.testimonial-role {
  color: #9ca3af;
  font-size: 0.875rem;
}

/* Swiper Navigation */
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
