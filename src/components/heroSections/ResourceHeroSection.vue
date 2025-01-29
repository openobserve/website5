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
    class="relative flex flex-col items-center justify-end text-center px-4 w-full min-h-[70vh] bg-cover bg-no-repeat bg-[50%_20vh] overflow-visible"
    style="
      background-image: url('/resources/Hero Section Eclipse (1).svg'),
        url('/resources/Hero Section Eclipse.svg');
    "
  >
    <div class="z-10 container mx-auto max-w-4xl">
      <TextWithGradient
        class=" text-center text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-4"
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
  background: linear-gradient(
    90deg,
    #f6ffe8 18.6%,
    #fff 57.25%,
    #eceee0 99.98%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
