<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css"; // Import Swiper styles
import CustomRoundShape from "../core/CustomRoundShape.vue";

// Props to receive card data and optional styling
const props = defineProps({
  cards: {
    type: Array,
    required: true,
  },
  titleTextColor: {
    type: String,
    default: "text-[#E2E3E5]",
    required: false,
  },
  descriptionTextColor: {
    type: String,
    default: "text-[#BEC0C2]",
    required: false,
  },
});
</script>

<template>
  <div class="w-full">
    <Swiper
      :spaceBetween="20"
      :slidesPerView="1"
      :breakpoints="{
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }"
      pagination="{ clickable: true }"
      navigation="true"
      class="mySwiper"
      modules="[Pagination]"
    >
      <!-- Loop through cards and render each one in a SwiperSlide -->
      <SwiperSlide v-for="(item, index) in cards" :key="index">
        <div class="flex gap-4">
          <div class="h-14">
            <CustomRoundShape
              :imgSrc="item.icon"
              iconSize="small"
              borderColor="bg-gradient-gray"
              size="small"
            />
          </div>
          <div class="flex flex-col gap-2">
            <h2
              :class="`font-semibold text-[16px] sm:text-[18px] md:text-[20px] m-0 ${titleTextColor}`"
            >
              {{ item.title }}
            </h2>
            <p
              :class="`text-[12px] sm:text-[14px] md:text-[16px] m-0 ${descriptionTextColor}`"
            >
              {{ item.description }}
            </p>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style scoped>
/* Swiper styles for custom appearance */
.mySwiper {
  width: 100%;
}

.swiper-pagination-bullet {
  background: #ccc; /* Default dot color */
}

.swiper-pagination-bullet-active {
  background: #007bff; /* Active dot color */
}
</style>
