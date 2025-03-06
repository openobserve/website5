<script setup>
import { defineProps } from "vue";
import CustomBluredImage from "../core/CustomBluredImage.vue";
import { getImageUrl } from "@/utils/GetImageUrl";

const props = defineProps({
  card: {
    type: Object,
    required: true,

    default: () => ({
      image: {},
      title: "",
      description: "",
      btnTitle: "",
      link: "#",
    }),
  },
});
</script>

<template>
  <div class="w-full h-full bg-black rounded-lg">
    <div
      class="group custom-hover flex flex-col rounded-lg h-full bg-center p-3 md:p-4 space-y-3 transition-all duration-300 bg-gradient-gray"
    >
    <div class="w-full h-64">
      <CustomBluredImage
        :image="getImageUrl(card.image) || ''"
        :altText="card.title"
        class="w-full h-full"
      />
    </div>

      <div class="flex flex-col space-y-2">
        <h3 class="text-white text-lg lg:text-2xl font-bold">
          {{ card?.title }}
        </h3>
        <p class="text-white text-sm lg:text-base flex-1 line-clamp-2">
          {{ card?.description }}
        </p>
        <a :href="card.link" target="_blank" rel="noopener noreferrer"
          class="text-[#80B9FF] font-bold text-sm md:text-base lg:text-lg mt-auto">
          {{ card?.btnTitle }}
        </a>
      </div>
    </div>
  </div>
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
  background: linear-gradient(180deg,
      rgba(203, 227, 255, 0.95) 0%,
      rgba(185, 208, 249, 0.9) 25%,
      rgba(170, 190, 249, 0.85) 50%,
      rgba(173, 173, 255, 0.8) 75%,
      rgba(163, 163, 254, 0.75) 100%);
  border-radius: 8px;
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  z-index: -1;
  opacity: 0.9;
}

.group {
  background-color: transparent;
  /* Default background */
}

.group:hover {
  background-image: url("/img/bg/gradient-bg/CaseStudyEclipse.svg");
  background-size: cover;
  background-position: center;
}
</style>
