<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Navigation } from "swiper/modules";
import CustomBluredImage from "../core/CustomBluredImage.vue";
import { ref, onMounted, onUnmounted } from "vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const props = defineProps({
  sectionData: {
    type: Array,
    required: true,
  },
  titleTextColor: {
    type: String,
    default: "text-white",
    required: false,
  },
  descriptionTextColor: {
    type: String,
    default: "text-gray-400",
    required: false,
  },
  cardBgColor: {
    type: String,
    default: "bg-[#2A2A2A]",
    required: false,
  },
  linkColor: {
    type: String,
    default: "text-[#00A3FF]",
    required: false,
  },
});

const isMobile = ref(false);

// Detect screen size on mount
const updateScreenSize = () => {
  isMobile.value = window.innerWidth < 768;
};

onMounted(() => {
  updateScreenSize();
  window.addEventListener("resize", updateScreenSize);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateScreenSize);
});

const swiperModules = [Pagination, Navigation];

const swiperOptions = ref({
  slidesPerView: 1.2,
  spaceBetween: 16,
  pagination: {
    clickable: true,
    el: ".swiper-pagination",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    640: {
      slidesPerView: 1.5,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 24,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },
});

const truncateDescription = (text: string, wordLimit: number) => {
  const words = text.split(" ");
  return words.length > wordLimit
    ? words.slice(0, wordLimit).join(" ") + "..."
    : text;
};
</script>

<template>
  <div class="relative">
    <div class="container mx-auto">
      <div class="relative">
        <!-- Swiper -->
        <swiper class="blog-swiper" :modules="swiperModules" v-bind="swiperOptions">
          <swiper-slide v-for="blog in sectionData" :key="blog.slug">
            <a :href="`/blog/${blog?.slug}`" :class="[linkColor, 'text-sm font-semibold hover:opacity-80']">
              <div :class="[cardBgColor, 'h-full rounded-xl overflow-hidden transition-transform ']">
                <CustomBluredImage :image="blog.image || ''" :altText="blog.title" />
                <div class="p-4 mb-3">
                  <h3 :class="[titleTextColor, 'text-xl font-bold mb-2']">
                    {{ blog.title }}
                  </h3>
                  <p :class="[descriptionTextColor, 'mb-4 text-sm line-clamp-2']">
                    {{ blog.description }}
                  </p>
                </div>
              </div>
            </a>
          </swiper-slide>
        </swiper>

        <!-- Pagination (only visible on mobile) -->
        <div v-show="isMobile" class="swiper-pagination"></div>

        <!-- Navigation Arrows (Hidden on Mobile) -->
        <div class="hidden md:block">
          <div class="swiper-button-prev absolute left-2 top-1/2 transform -translate-y-1/2 z-20"></div>
          <div class="swiper-button-next absolute right-2 top-1/2 transform -translate-y-1/2 z-20"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.blog-swiper {
  padding-bottom: 40px !important;
}

.swiper-slide {
  height: auto;
}
.swiper-pagination{
  display: flex !important;
  justify-content: center;
  bottom: 10px;
  position: absolute !important;
}
.blog-swiper .swiper-pagination-bullet {
  background: #4b5563;
  opacity: 1;
}

.blog-swiper .swiper-pagination-bullet-active {
  background: #3b82f6;
}

/* Hide navigation on mobile */
@media (max-width: 767px) {
  .swiper-button-prev,
  .swiper-button-next {
    display: none !important;
  }
}
</style>
