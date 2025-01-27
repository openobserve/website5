<script setup>
import Heading from "../core/Heading.vue";
import TextWithGradient from "../HeaderComponents/TextWithGradient.vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div
    class="flex flex-col justify-center items-center py-16 px-4 sm:px-8 lg:px-16"
  >
    <div
      class="container mx-auto max-w-4xl flex flex-col justify-center items-center text-center"
    >
      <TextWithGradient
        class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center"
        :title="props.title"
        textGradientColor="gradient-color"
      />
      <Heading
        :description="props.subtitle"
        align="CENTER"
        class="text-base sm:text-lg md:text-xl lg:text-2xl mt-4"
      />
    </div>
  </div>
</template>

<style scoped>
/* Gradient Text Styling */
.gradient-color {
  display: inline-block;
  background: linear-gradient(
    to right,
    rgba(60, 60, 60, 1),    /* Dark gray for the left side */
    rgba(75, 90, 125, 1),   /* Bluish-gray for the center */
    rgba(30, 50, 80, 1)   
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
