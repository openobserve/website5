<script setup>
import { defineProps } from "vue";
import CustomImage from "../core/CustomImage.vue";

const props = defineProps({
  card: {
    type: Object,
    required: true,
  },
});

const dynamicComponent = props.card.link ? "a" : "div";
</script>

<template>
  <dynamicComponent :href="card.link" class="relative rounded-2xl w-full p-[0.0625rem]
    bg-gradient-gray hover:bg-gradient-blue
    transition-all duration-300 shadow-2xl hover:shadow-[0_0_60px_0_rgba(66,174,255,0.8)] container mx-auto group">
    <!-- Content Layer -->
    <div class="flex flex-col space-y-4 w-full h-full items-center justify-center rounded-2xl bg-[#23282c] p-8">
      <CustomImage :image="card.image" altText="Icon" cssClass="h-16" />
      <h3 class="text-[#BEC0C2] text-base font-semibold text-center group-hover:text-[#80B9FF] title-fixed" :title="card.title">
        {{ card.title }}
      </h3>
    </div>
  </dynamicComponent>
</template>
<style scoped>
.title-fixed {
  display: block;
  min-height: calc(1.5rem * 2); /* Reserves space for exactly two lines */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  line-height: 1.5rem; /* Keeps consistent line spacing */
}
</style>
