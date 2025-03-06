<script setup>
import { computed } from "vue";
import CustomImage from "../core/CustomImage.vue";

const props = defineProps({
  card: {
    type: Object,
    required: true,
  },
});

// Dynamically determine component type based on the presence of a link
const dynamicComponent = computed(() => (props.card.link ? "a" : "div"));
</script>

<template>
  <component :is="dynamicComponent" :href="card.link" :target="card.link ? '_blank' : null" class="rounded-2xl w-full p-[0.0625rem] bg-gradient-gray hover:bg-gradient-blue transition-all duration-300 
           shadow-2xl hover:shadow-[0_0_60px_0_rgba(66,174,255,0.8)] mx-auto group">
    <!-- Content Layer -->
    <div class="flex flex-col space-y-2 md:space-y-3 w-full h-full items-center justify-center rounded-2xl 
             bg-[#23282c] pt-8 md:pt-9 p-1 md:p-6">
      <CustomImage :image="card.image" cssClass="h-8 lg:h-16" />
      <h3 class="text-[#BEC0C2] text-xs md:text-base font-semibold text-center 
               group-hover:text-[#80B9FF] title-fixed" :title="card.title">
        {{ card.title }}
      </h3>
    </div>
  </component>
</template>

<style scoped>
.title-fixed {
  display: block;
  min-height: calc(1.2rem * 2);
  /* Reserves space for exactly two lines */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  line-height: 1rem;
  /* Keeps consistent line spacing */
}
</style>
