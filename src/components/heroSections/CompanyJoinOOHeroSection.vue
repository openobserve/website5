<script setup>
import Heading from "../core/Heading.vue";
import TextWithGradient from "../HeaderComponents/TextWithGradient.vue";
import CustomButton from "../core/CustomButton.vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  titleGradientColor: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  buttons: {
    type: Array,
    default: () => [],
  },
  topBgImage: {
    type: String,
  },
  bottomBgImage: {
    type: String,
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
      backgroundImage: `url(${topBgImage}), url(${bottomBgImage})`,
      backgroundSize: 'contain, contain',
      backgroundPosition: 'top center, bottom -200px center',
    }"
  >
    <div
      class="container mx-auto flex flex-col justify-center items-center text-center gap-8"
    >
      <div class="text-5xl">
        <TextWithGradient
          :title="props.title"
          :textGradientColor="props.titleGradientColor"
        />
      </div>
      <div>
        <Heading
          :description="props.subtitle"
          align="CENTER"
          v-html="formatSubtitle(subtitle)"
        />
      </div>
      <div class="">
        <CustomButton
          :variant="button.variant"
          v-for="(button, index) in buttons"
          :key="index"
          class="w-full px-2 py-1"
        >
          {{ button.label }}
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
