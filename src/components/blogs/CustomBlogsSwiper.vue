<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Navigation } from "swiper/modules";
import CustomImage from "../core/CustomImage.vue";
import {generateNavLink} from "../../utils/redirection";
import CustomBluredImage from "../core/CustomBluredImage.vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface Blog {
  title: string;
  description: string;
  image: {
    url: string;
  };
}

interface BlogSectionData {
  title: string;
  description: string;
  image: {
    url: string;
  };
  slug: string;
}

const props = defineProps({
  sectionData: {
    type: Array as () => BlogSectionData[],
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

const swiperModules = [Pagination, Navigation];
const swiperOptions = {
  slidesPerView: 1.2, // Ensures cards are wider on mobile
  spaceBetween: 16,
  pagination: {
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    640: {
      slidesPerView: 1.5, // Slightly larger cards on small tablets
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
};

</script>

<template>
  <div class="py-8 relative">
    <div class="container mx-auto">
      <div class="relative">
        <!-- Swiper -->
        <swiper
          class="blog-swiper"
          :modules="swiperModules"
          v-bind="swiperOptions"
        >
          <swiper-slide v-for="blog in sectionData" :key="blog.title">
            <a
              :href="generateNavLink('blog', blog.slug)"
           rel="noopener noreferrer" :class="[
            cardBgColor,
            ' rounded-xl overflow-hidden cardShadow  transition-all duration-300 hover:shadow-2xl',
          ]">
         
          <CustomBluredImage :image="blog.image?.url || ''" :altText="blog.title" />

          <!-- Right Side - Content -->
          <div class="w-full p-6 flex flex-col">
            <div>
              <h6 :class="[titleTextColor, 'text-md font-bold mb-3']">
                {{ blog.title }}
              </h6>
              <p :class="[descriptionTextColor, 'mb-2 text-sm line-clamp-2']">
                {{ blog.description }}
              </p>
            </div>
          </div>
        </a>
          </swiper-slide>
        </swiper>

        <!-- Navigation Arrows (Hidden on Mobile) -->
        <div class="hidden md:block">
          <div
            class="swiper-button-prev absolute left-2 top-1/2 transform -translate-y-1/2 z-20"
          ></div>
          <div
            class="swiper-button-next absolute right-2 top-1/2 transform -translate-y-1/2 z-20"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.blog-swiper {
  padding-bottom: 40px !important;
  mask-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0) 0%,
    black 10%,
    black 90%,
    rgba(0, 0, 0, 0) 100%
  );
}

.blog-swiper .swiper-pagination-bullet {
  background: #4b5563;
  opacity: 1;
}

.blog-swiper .swiper-pagination-bullet-active {
  background: #3b82f6;
}

.swiper-slide {
  height: auto;
}

/* Navigation Arrows Styles (Hidden on Mobile) */
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
