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
  <section
    class="relative flex flex-col items-center text-center bg-no-repeat bg-cover px-4 py-24 overflow-visible"
    style="
      background-image: url('/resources/Hero Section Eclipse.svg'),
        url('/resources/Hero Section Eclipse (1).svg');
    "
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
  </section>
</template>

<style scoped>
/* Gradient Text Styling */
.gradient-color {
  display: inline-block;
  background: linear-gradient(
    90deg,
    #f6ffe8 18.6%,
    #fff 57.25%,
    #eceee0 99.98%
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
