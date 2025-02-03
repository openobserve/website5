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
  return text.split('.').filter(sentence => sentence.trim())
    .map(sentence => `<span class="sentence">${sentence.trim()}.</span>`)
    .join('');
};

</script>

<template>
  <div
    class="relative flex flex-col justify-center items-center py-16 px-4 sm:px-8 lg:px-16 bg-no-repeat bg-cover"
    :style="{
      backgroundImage: 'url(/aboutusHerosectionbg)',
      backgroundSize: 'contain',
      backgroundPosition: 'center',
    }"
  >
    <div
      class="container mx-auto flex flex-col justify-center items-center text-center gap-8"
    >
      <div>
       <h1 class="text-5xl text-white font-bold text-center"> {{ title }} </h1>
      </div>
      <div>
        <Heading
          :description="description"
          align="CENTER"
          v-html="formatSubtitle(description)"
        />
      </div>
      <div v-if="primaryButton">
        <CustomButton variant="primary" class="w-full sm:w-auto" :buttonLink="primaryButton?.link">
          {{ primaryButton?.text }}
        </CustomButton>
      </div>
    </div>
  </div>
</template>

<style scoped>

/* Ensure a smooth scaling of text gradients on smaller screens */
@media (max-width: 640px) {
  .gradient-color {
    font-size: 2rem;
    line-height: 1.2;
  }
}
</style>
