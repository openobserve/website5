<script setup>
import { computed } from "vue";
import CustomImage from "../core/CustomImage.vue";
import CustomSection from "../core/CustomSection.vue";
import Heading from "../core/Heading.vue";

const props = defineProps({
  heading: {
    type: Object,
    required: true,
  },
  items: {
    type: Array, // Ensuring it's an Array instead of Object
    required: true,
  },
});

// Define background images for different item positions
const bgImages = [
  "/img/bg/gradient-bg/Tiles-F1-eclipse.svg", // First and last items
  "/img/bg/gradient-bg/Home-F2-Eclipse.svg", // Middle items
];

// Compute background styles dynamically
const getBackgroundImage = (index) =>
  `url(${index === 0 || index > 1 ? bgImages[0] : bgImages[1]})`;
</script>

<template>
  <CustomSection>
    <Heading v-if="heading?.title" :title="heading.title" align="CENTER" />

    <div class="pt-3 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center">
      <div v-for="(card, index) in items" :key="index"
        class="w-full border border-[#313539] h-auto p-6 flex flex-col items-center rounded-lg gap-4 bg-no-repeat"
        :style="{ backgroundImage: getBackgroundImage(index) }">
        <div class="rounded-full flex justify-center items-center mb-4">
          <CustomImage :image="card.image" cssClass="w-full h-auto" />
        </div>
        <h3 class="title-gradient text-3xl font-semibold text-center">
          {{ card.title }}
        </h3>
        <p class="text-sm text-[#DCDCDF] text-center">
          {{ card.description }}
        </p>
      </div>
    </div>
  </CustomSection>
</template>

<style scoped>
/* Apply a gradient color effect to the title */
.title-gradient {
  background: linear-gradient(270deg, #75cdd6 0%, #008cff 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
