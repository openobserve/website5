<script setup>
import { computed, defineProps } from 'vue';
import CustomSection from './CustomSection.vue';
import CustomImage from './CustomImage.vue';

// Props definition
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
});

// Create a computed property to duplicate the data array
const repeatedData = computed(() => [...props.items, ...props.items]);
</script>


<template>
  <div class="py-2">
    <div class="carousel-container">
      <div class="slide">
        <div v-for="(item, index) in repeatedData" :key="index"
          class="flex-none w-28 lg:w-40 h-full grayscale transition duration-200 hover:grayscale-0 mx-4">
          <CustomImage :image="item?.Image" cssClass="w-full h-full object-cover" />
          <!-- :alt="item.altText" -->
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
/* Add your styles if needed or import them */
@keyframes slide {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-50%);
  }
}

.slide {
  display: flex;
  flex-wrap: nowrap;
  animation: slide 25s infinite linear;
  /* Adjust time based on number of items */
  transition: translateX 0.5s ease;
  /* width: max-content; Ensure the slide container fits the content */
  width: calc(200% + 16px);
  /* Adjust to fit the doubled content */
}

.carousel-container {
  position: relative;
  overflow: hidden;
  width: 100%;
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
  content: '';
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
  background: linear-gradient(to right, rgba(var(--gray-dark), 1) 0%, rgba(var(--gray-dark), 0) 100%);
  width: 6px;
}

.carousel-container::after {
  right: 0;
  background: linear-gradient(to left, rgba(var(--gray-dark), 1) 0%, rgba(var(--gray-dark), 0) 100%);
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
