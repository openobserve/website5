<script setup>
import { defineProps } from "vue";
import CustomImage from "../core/CustomImage.vue";

const props = defineProps({
  card: {
    type: Object,
    required: true,
    default: () => ({
      image: "",
      title: "",
      description: "",
      btnTitle: "",
      link: "#",
    }),
  },
});
</script>

<template>
  <!-- <div class="border-gradient w-full h-full"> -->
  <div
    class="group custom-hover flex flex-col h-full rounded-lg bg-cover bg-center p-2 lg:p-4 space-y-2 md:space-y-4 transition-all duration-300 bg-gradient-gray"
  >
    <div class="">
      <CustomImage
        :image="card.image"
        :altText="card.title"
        cssClass="w-full h-auto max-h-60 md:max-h-80 lg:max-h-96 object-cover rounded-lg grayscale group-hover:grayscale-0"
      />
    </div>
    <div class="flex flex-col h-full space-y-4">
      <h3 class="text-[#BEC0C2] text-lg lg:text-2xl font-bold mb-2 md:mb-3">
        {{ card?.title }}
      </h3>
      <p class="text-white text-sm lg:text-base flex-1">
        {{ card?.description }}
      </p>
      <a
        :href="card.link"
        target="_blank"
        rel="noopener noreferrer"
        class="text-[#80B9FF] font-bold text-sm md:text-base lg:text-lg mt-auto"
      >
        {{ card?.btnTitle }}
      </a>
    </div>
  </div>
  <!-- </div> -->
</template>

<style scoped>
.custom-hover {
  position: relative;
  display: inline-flex;
  justify-content: center;
  transition: all 0.3s ease;
  border: none;
  isolation: isolate;
  z-index: 1;
}

.custom-hover::before {
  content: "";
  position: absolute;
  inset: -2px;
  z-index: -1;
  opacity: 0.8;
}

.custom-hover:hover::after {
  content: "";
  position: absolute;
  inset: -2px;
  padding: 2px;
  background: linear-gradient(
    180deg,
    rgba(203, 227, 255, 0.95) 0%,
    rgba(185, 208, 249, 0.9) 25%,
    rgba(170, 190, 249, 0.85) 50%,
    rgba(173, 173, 255, 0.8) 75%,
    rgba(163, 163, 254, 0.75) 100%
  );
  border-radius: 8px;
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  z-index: -1;
  opacity: 0.9;
}
.group {
  background-color: transparent; /* Default background */
}

.group:hover {
  background-image: url("/CaseStudyEclipse.svg");
  background-size: cover;
  background-position: center;
}
</style>
