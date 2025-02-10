<template>
    <swiper
      :slides-per-view="1"
      :space-between="10"
      :breakpoints="{
        640: { slidesPerView: 2, spaceBetween: 20 },
        1024: { slidesPerView: 3, spaceBetween: 30 }
      }"
      :pagination="{ clickable: true }"
      :navigation="true"
    >
      <swiper-slide v-for="(item, index) in items" :key="item.slug || index">
        <slot :item="item"></slot>
      </swiper-slide>
    </swiper>
  </template>
  
  <script>
  import { Swiper, SwiperSlide } from "swiper/vue";
  import "swiper/css";
  import "swiper/css/pagination";
  import "swiper/css/navigation";
  
  export default {
    components: {
      Swiper,
      SwiperSlide,
    },
    props: {
      items: {
        type: Array,
        required: true,
      },
    },
  };
  </script>
  