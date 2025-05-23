<script setup>
import CustomBluredImage from "../core/CustomBluredImage.vue";
import { getImageUrl } from "@/utils/GetImageUrl";

const props = defineProps({
  card: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="rounded-lg w-full flex-1 bg-black">
    <div
      class="group custom-hover flex rounded-lg h-full p-2 lg:p-4 space-x-2 lg:space-x-4 bg-gradient-gray transition-all duration-300 w-full">
      <div class="lg:w-2/5">
        <CustomBluredImage :image="getImageUrl(card.image) || ''" :altText="card.title" height="full" />
      </div>

      <div class="flex flex-col h-full space-y-0 w-full lg:w-3/5">
        <h3 class="text-white text-lg lg:text-2xl font-bold mb-3 line-clamp-3">
          {{ card?.title }}
        </h3>
        <p class="text-white text-sm lg:text-base line-clamp-3">
          {{ card?.description }}
        </p>
        <a :href="card.link" target="_blank" rel="noopener noreferrer"
          class="text-[#80B9FF] font-bold text-base mt-auto">
          {{ card.btnTitle }}
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-hover {
  position: relative;
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
  transition: background 0.3s ease-in-out;
}

.group:hover {
  background-image: url("/img/bg/gradient-bg/blogRightCardBg.svg");
  background-size: cover;
  background-position: center;
}
</style>
