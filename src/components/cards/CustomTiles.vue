<script setup>
import CustomImage from '../core/CustomImage.vue';

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

const bgImages = [
  "/Homepage/Tiles-F1-eclipse.svg", // First and last card
  "/Homepage/Home-F2-Eclipse.svg",  // Middle card
];
</script>

<template>
  <div
    class="w-full border border-[#313539] h-auto p-6 flex flex-col items-center rounded-lg gap-4 bg-no-repeat"
    :style="{ backgroundImage: `url(${index === 0 || index > 1 ? bgImages[0] : bgImages[1]})` }"
  >
    <div class="rounded-full flex justify-center items-center mb-4">
      <CustomImage :image="card.image" altText="Card Image" cssClass="w-full h-auto" />
    </div>
    <h3 class="title-color text-3xl font-semibold text-[#BEC0C2] text-center">
      {{ card.title }}
    </h3>
    <p class="text-sm text-[#DCDCDF] text-center">
      {{ card.description }}
    </p>
  </div>
</template>

<style scoped>
.title-color {
  background: linear-gradient(270deg, #75cdd6 0%, #008cff 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
