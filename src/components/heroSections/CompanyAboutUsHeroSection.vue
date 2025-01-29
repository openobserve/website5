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
</script>

<template>
  <div
    class="relative flex flex-col justify-center items-center py-16 px-4 sm:px-8 lg:px-16 bg-no-repeat bg-cover"
    :style="{
      backgroundImage: `url(${topBgImage}), url(${bottomBgImage})`,
      backgroundSize: 'contain, contain',
      backgroundPosition: 'top center, bottom center',
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
        <Heading :description="props.subtitle" align="CENTER" />
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
/* Gradient Text Styling */
.gradient-color {
  display: inline-block;
  background: linear-gradient(
    to right,
    rgba(60, 60, 60, 1),
    /* Dark gray for the left side */ rgba(75, 90, 125, 1),
    /* Bluish-gray for the center */ rgba(30, 50, 80, 1)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Ensure a smooth scaling of text gradients on smaller screens */
@media (max-width: 640px) {
  .gradient-color {
    font-size: 2rem;
    line-height: 1.2;
  }
}
</style>
