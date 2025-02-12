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
</script>

<template>
  <div
    class="relative flex items-center justify-center min-h-[40vh] px-6 sm:px-12 lg:px-24 bg-no-repeat py-8 mb-[20vh]"
    :style="{
      backgroundImage:
        'url(/CareerHeroSectionTopBg.svg), url(/CareerHeroBottomBg.svg)',
      backgroundPosition: 'center -200px,center ',
      backgroundSize: 'cover, cover',
      backgroundRepeat: 'no-repeat, no-repeat',
    }"
  >
    <div
      class="container mx-auto flex flex-col justify-center items-center text-center gap-8"
    >
      <div>
        <h1 class="text-5xl text-white font-bold text-center">{{ title }}</h1>
      </div>
      <div>
        <p
          v-html="description"
          class="text-white text-base md:text-lg xl:text-xl max-w-3xl mt-4"
        ></p>
      </div>
      <div class="py-10" v-if="primaryButton">
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
