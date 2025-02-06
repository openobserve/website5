<script setup>
import Heading from "../core/Heading.vue";
import TextWithGradient from "../HeaderComponents/TextWithGradient.vue";
import CustomButton from "../core/CustomButton.vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  primaryButton: {
    type: Object,
    required: false,
  },
});

// Function to split text at periods and wrap each sentence in a span
const formatSubtitle = (text) => {
  return text
    .split(".")
    .filter((sentence) => sentence.trim())
    .map((sentence) => `<span class="sentence">${sentence.trim()}.</span>`)
    .join("");
};
</script>

<template>
  <div
    class="relative flex flex-col justify-center items-center py-10 lg:py-16 px-4 sm:px-8 lg:px-16 bg-no-repeat bg-cover h-[70vh] lg:h-[50vh]"
    :style="{
      backgroundImage: 'url(/CareerHeroSectionTopBg.svg), url(/CareerHeroBottomBg.svg)',
      backgroundSize: 'contain, contain',
      backgroundPosition: 'top center, bottom -100px center',
    }"
  >
    <div
      class="container mx-auto flex flex-col justify-center items-center text-center gap-8"
    >
      <div>
        <h1 class="text-5xl text-white font-bold text-center">{{ title }}</h1>
      </div>
      <div>
       <p v-html="description" class="text-white text-base md:text-lg xl:text-xl mt-4"></p>
      </div>
      <div class="" v-if="primaryButton">
        <CustomButton
          variant="secondary"
          class="w-full sm:w-auto"
          :buttonLink="primaryButton.link"
        >
          {{ primaryButton.text }}
        </CustomButton>
      </div>
    </div>
  </div>
</template>
