<script setup>
import { defineProps, ref, computed } from "vue";
import Heading from "../core/Heading.vue";
import CustomButton from "../core/CustomButton.vue";
import CustomImage from "../core/CustomImage.vue";
import CustomSection from "../core/CustomSection.vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Navigation , Autoplay } from "swiper/modules";

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
});

const swiperModules = [Pagination, Navigation, Autoplay];
const swiperOptions = {
  slidesPerView: 1, // Ensures cards are wider on mobile
  spaceBetween: 16,
  pagination: {
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  autoplay: {
    delay: 5000, // 5 seconds
    pauseOnMouseEnter: true,
  },
};
const currentIndex = ref(0);
const slidesPerView = ref(1);

const updateShadow = (swiper) => {
  currentIndex.value = swiper.activeIndex;
  slidesPerView.value = swiper.params.slidesPerView; // Get slidesPerView dynamically
};
</script>

<template>
  <div class="relative">
    <Swiper
      class="blog-swiper"
      :class="shadowClass"
      :modules="swiperModules"
      v-bind="swiperOptions"
      @slideChange="updateShadow"
    >
      <SwiperSlide v-for="(item, index) in items" :key="index">
        <CustomSection>
          <div
            class="relative flex flex-col glass-card bg-opacity-80 backdrop-blur-lg shadow-lg p-10 z-10 text-white"
          >
            <div>
              <Heading
                :title="item.heading?.title"
                :description="item.heading?.subtitle"
                align="CENTER"
              />
            </div>
            <div class="flex flex-row">
              <div class="flex flex-col-reverse lg:flex-row gap-5 w-full">
                <div class="w-full lg:w-1/2">
                  <div class="flex flex-col gap-2 lg:gap-4">
                    <div
                      v-for="item in item.items"
                      :key="item.title"
                      class="rounded-2xl px-3 lg:px-4 py-2 lg:py-3 bg-dark-glass"
                    >
                      <h3
                        class="text-sm lg:text-lg text-white font-medium mb-2"
                      >
                        {{ item?.title }}
                      </h3>
                      <p class="text-xs lg:text-base font-light text-white">
                        {{ item?.description }}
                      </p>
                    </div>
                    <div
                      class="gap-4 mt-3 lg:mt-0 w-full md:w-72 justify-center"
                    >
                      <CustomButton
                        variant="secondary"
                        buttonText="View Case Study"
                        :buttonLink="`/case-studies/${item?.link}`"
                      />
                    </div>
                  </div>
                </div>
                <div class="w-full lg:w-1/2 relative h-72 lg:h-auto">
                  <div
                    class="absolute inset-0 bg-cover bg-center rounded-lg bg-[url('/img/placeholder/case-study-placeholder-image.png')] z-0"
                  ></div>
                  <CustomImage
                    :image="item?.clientLogo?.url"
                    class="p-3 absolute z-10 w-1/2 h-full flex justify-center transform translate-x-1/2"
                  />
                </div>
              </div>
              <div class="hidden md:block">
                <div
                  class="swiper-button-prev absolute -translate-x-1/4 top-1/2 transform -translate-y-1/2 z-20"
                ></div>
                <div
                  class="swiper-button-next absolute translate-x-1/4 top-1/2 transform -translate-y-1/2 z-20"
                ></div>
              </div>
            </div>
          </div>
        </CustomSection>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style scoped>
.glass-card {
  border-radius: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  background: linear-gradient(
    180deg,
    rgba(1, 1, 1, 0.48) 30%,
    rgba(1, 1, 1, 0.8) 100%
  );
}
.bg-dark-glass {
  background: linear-gradient(
    90deg,
    rgba(42, 48, 51, 1) 0%,
    rgba(82, 92, 97, 0.7) 50%,
    rgba(157, 170, 178, 0)
  );
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3);
}

.image-bg {
  background: linear-gradient(
    45deg,
    rgba(49, 53, 57, 1),
    rgba(31, 34, 38, 1),
    rgba(49, 53, 57, 1)
  );
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3);
}

.glow-effect::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 150%;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: radial-gradient(
    circle,
    rgba(64, 113, 212, 1) 0%,
    rgba(0, 0, 0, 0) 70%
  );
  opacity: 0.8;
  filter: blur(10px);
}

.glow-effect:hover::before {
  opacity: 1;
}

.glow-effect {
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.5));
}

.blog-swiper {
  padding-bottom: 40px !important;
}

.blog-swiper.show-both {
  mask-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0) 0%,
    black 10%,
    black 90%,
    rgba(0, 0, 0, 0) 100%
  );
}

.blog-swiper.hide-left {
  mask-image: linear-gradient(
    to right,
    black 0%,
    black 90%,
    rgba(0, 0, 0, 0) 100%
  );
}

.blog-swiper.hide-right {
  mask-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0) 0%,
    black 10%,
    black 100%
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
  pointer-events: auto; /* Ensure it still intercepts clicks */
}
</style>
