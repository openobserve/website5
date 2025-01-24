<script setup>
import { defineProps } from "vue";

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
  <div
    class="group flex flex-col h-full rounded-lg bg-cover bg-center p-2 lg:p-4 space-y-2 md:space-y-4  bg-gradient-gray grayscale group-hover:grayscale-0 group-hover:filter transition-all duration-300 border  border-transparent hover:border-gradient-blue"
  >
    <div>
      <img
        :src="card.image"
        :alt="card.title"
        class="w-full h-auto max-h-60 md:max-h-80 lg:max-h-96 object-cover rounded-lg grayscale group-hover:grayscale-0"
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
</template>

<style scoped>

.group {
  background-color: transparent; /* Default background */
  transition: background 0.3s ease-in-out;
}

.group:hover {
  background-image: url("/CaseStudyEclipse.svg");
  background-size: cover;
  background-position: center;
}
</style>
