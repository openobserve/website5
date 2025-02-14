<script setup>
import { computed, defineProps } from "vue";
import CustomImage from "./CustomImage.vue";

// Props definition
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
});

// Duplicate items once for seamless infinite scrolling
const repeatedData = computed(() => {
  return [...props.items, ...props.items]; // Just duplicate once for smooth looping
});
</script>

<template>
  <div class="py-10 container mx-auto">
    <div class="carousel-container">
      <div class="slide flex flex-row justify-center items-center">
        <div
          v-for="(item, index) in repeatedData"
          :key="index"
          class="flex-none h-10 md:h-14 grayscale brightness-75 hover:brightness-100 transition duration-200 hover:grayscale-0 mx-8"
        >
          <CustomImage
            :image="item?.Image"
            cssClass="w-auto h-full object-cover"
          />
          <!-- :alt="item.altText" -->
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add your styles if needed or import them */
@keyframes infiniteScroll {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-50%);
  }
}

.slide {
  display: flex;
  animation: infiniteScroll 30s linear infinite;
  transition: translateX 0.5s ease;
  /* Adjust time based on number of items */
  /* width: max-content; Ensure the slide container fits the content */
  width: calc(200% + 16px);
  /* Adjust to fit the doubled content */
}

.carousel-container {
  position: relative;
  overflow: hidden;
  width: 100%;
  mask-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0) 0%,
    black 10%,
    black 90%,
    rgba(0, 0, 0, 0) 100%
  );
  /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); */
  /* border-radius: 8px; */
}

.slide:hover {
  animation-play-state: paused;
  /* Pause the animation on hover */
}

/* Gradient effect at both ends with rounded corners */
.carousel-container::before,
.carousel-container::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  width: 380px;
  /* Adjust based on how wide you want the gradient */
  pointer-events: none;
  z-index: 1;
  /* border-radius: 16px; Match with the container's border-radius */
}

.carousel-container::before {
  left: 0;
  background: linear-gradient(
    to right,
    black 0%,
    rgba(var(--gray-dark), 0) 100%
  );
  width: 40px;
}

.carousel-container::after {
  right: 0;
  background: linear-gradient(
    to left,
    rgba(var(--gray-dark), 1) 0%,
    rgba(var(--gray-dark), 0) 100%
  );
  width: 6px;
}

/* For screens wider than 768px */
/* @media (max-width: 768px) {

   .carousel-container::before,
   .carousel-container::after {
     width: 180px;
   }
 } */
</style>
