<script setup>
import { defineProps } from "vue";
import CustomImage from "../core/CustomImage.vue";

const props = defineProps({
  card: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});

const dynamicComponent = props.card.link ? "a" : "div";
</script>

<template>
  <dynamicComponent
    :href="card.link"
    :class="[
      'rounded-2xl w-full p-[0.0625rem] bg-gradient-blue transition-all duration-300 shadow-2xl hover:shadow-[0_0_60px_0_rgba(66,174,255,0.8)]',
      {
        'lg:col-span-2': index === 0 || index === 1,
        'lg:col-span-3': index === 2,
      },
    ]"
  >
    <!-- Content Layer -->
    <div class="flex flex-col space-y-4 w-full h-full items-center justify-center rounded-2xl bg-[#23282c] pb-3 md:pb-2  pt-8 md:pt-9 p-1 md:p-6">
      <CustomImage :image="card.image" cssClass="h-8 md:h-16" />
      <h3 class="text-[#BEC0C2] text-xs md:text-base font-semibold text-center title-fixed" :title="card.title">
        {{ card.title }}
      </h3>
    </div>
  </dynamicComponent>
</template>

<style scoped>
.cardShadow:hover {
  box-shadow: 0 0 60px 0 rgba(66, 174, 255, 0.8);
  border-radius: 1rem;
  transition: all;
}
.title-fixed {
  display: block;
  min-height: calc(1.2rem * 2); /* Reserves space for exactly two lines */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  line-height: 1rem; /* Keeps consistent line spacing */
}
</style>
