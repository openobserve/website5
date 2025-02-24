<script setup>
import { defineProps } from "vue";

const props = defineProps({
  cards: {
    type: Array,
    required: true,
    default: () => [],
  },
});
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 w-full h-full">
    <div v-for="(item, index) in cards" :key="index" class="rounded-lg h-full">
      <div
        class="group custom-hover flex rounded-lg h-full p-2 lg:p-4 space-x-2 lg:space-x-4 bg-gradient-gray transition-all duration-300"
      >
        <div>
          <img
            :src="item.image"
            :alt="item.title"
            class="w-full h-full object-cover rounded-lg grayscale group-hover:grayscale-0 transition-all duration-300"
          />
        </div>
        <div class="flex flex-col h-full space-y-4 w-2/3">
          <h3 class="text-[#BEC0C2] text-lg lg:text-2xl font-bold mb-3">
            {{ item?.title }}
          </h3>
          <p class="text-white text-sm lg:text-base flex-1">
            {{ item?.description }}
          </p>
          <a
            :href="item.link"
            target="_blank"
            rel="noopener noreferrer"
            class="text-[#80B9FF] font-bold text-xs md:text-base mt-auto"
          >
            {{ item.btnTitle }}
          </a>
        </div>
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
  background-color: transparent;
  transition: background 0.3s ease-in-out;
}

.group:hover {
  background-image: url("/img/bg/gradient-bg/blogRightCardBg.svg");
  background-size: cover;
  background-position: center;
}
</style>
