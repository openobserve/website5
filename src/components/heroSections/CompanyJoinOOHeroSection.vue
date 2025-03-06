<script setup>
import CustomButton from "../core/CustomButton.vue";
import TextWithGradient from "../header/TextWithGradient.vue";
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
  <div class="relative flex items-center justify-center min-h-[40vh] px-6 sm:px-12 lg:px-24 bg-no-repeat py-8" :style="{
    backgroundImage:
      'url(/img/bg/gradient-bg/CareerHeroSectionTopBg.svg), url(/img/bg/gradient-bg/CareerHeroBottomBg.svg)',
    backgroundPosition: 'center -200px,center',
    backgroundSize: 'cover, cover',
    backgroundRepeat: 'no-repeat, no-repeat',
  }">
    <div class="container mx-auto flex flex-col justify-center items-center text-center gap-8">
      <div>
        <TextWithGradient class="text-center text-5xl lg:text-7xl max-w-xl font-bold" :title="props.title"
          textGradientColor="gradient-color" />
      </div>
      <div>
        <p v-html="description" class="text-white text-base md:text-lg xl:text-xl max-w-3xl mt-4"></p>
      </div>
      <div class="py-10" v-if="primaryButton">
        <CustomButton variant="secondary" class="w-full sm:w-auto" :buttonLink="primaryButton.link" target="_blank">
          {{ primaryButton.text }}
        </CustomButton>
      </div>
    </div>
  </div>
</template>
<style scoped>
/* Gradient Text Styling */
.gradient-color {
  background: linear-gradient(90deg,
      #fff3e5 21.63%,
      #c3d6ff 59.28%,
      #d8d8d8 91.35%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
