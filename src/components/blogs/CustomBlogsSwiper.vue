<script setup lang="ts">
import { ref, computed } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Navigation } from "swiper/modules";
import { generateNavLink } from "../../utils/redirection";
import CustomBluredImage from "../core/CustomBluredImage.vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { getImageUrl } from "@/utils/GetImageUrl";

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
const currentIndex = ref(0);
const slidesPerView = ref(1);

const totalSlides = computed(() => props.sectionData.length);

const updateShadow = (swiper: any) => {
  currentIndex.value = swiper.activeIndex;
  slidesPerView.value = swiper.params.slidesPerView; // Get slidesPerView dynamically
};

const shadowClass = computed(() => {
  if (totalSlides.value <= 1) return ""; // No shadows if only 1 blog

  const lastVisibleIndex = totalSlides.value - slidesPerView.value;

  if (currentIndex.value === 0) return "hide-left"; // Hide left shadow at first slide
  if (currentIndex.value >= lastVisibleIndex) return "hide-right"; // Hide right shadow at last visible slide

  return "show-both"; // Show both shadows in the middle
});
</script>

<template>
  <div class="py-2 md:py-4 lg:py-8 relative">
    <div class="container mx-auto">
      <div class="relative">
        <!-- Swiper -->
        <swiper class="blog-swiper" :class="shadowClass" :modules="swiperModules" v-bind="swiperOptions"
          @slideChange="updateShadow">
          <swiper-slide v-for="blog in sectionData" :key="blog.title">
            <a :key="blog.title" :href="generateNavLink('blog', blog.slug)" rel="noopener noreferrer" :class="[
              cardBgColor,
              ' rounded-xl overflow-hidden cardShadow  transition-all duration-300 hover:shadow-2xl',
            ]">
              <CustomBluredImage :image="getImageUrl(blog.image) || ''" :altText="blog.title" />

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

.blog-swiper.show-both {
  mask-image: linear-gradient(to right,
      rgba(0, 0, 0, 0) 0%,
      black 10%,
      black 90%,
      rgba(0, 0, 0, 0) 100%);
}

.blog-swiper.hide-left {
  mask-image: linear-gradient(to right,
      black 0%,
      black 90%,
      rgba(0, 0, 0, 0) 100%);
}

.blog-swiper.hide-right {
  mask-image: linear-gradient(to right,
      rgba(0, 0, 0, 0) 0%,
      black 10%,
      black 100%);
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
  pointer-events: auto;
  /* Ensure it still intercepts clicks */
}
</style>
