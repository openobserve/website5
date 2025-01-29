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
      background-image: url('/resources/Hero Section Eclipse.svg'),
        url('/resources/Hero Section Eclipse (1).svg');
    "
  >
    <div
      class="z-10 container mx-auto max-w-4xl flex flex-col justify-center items-center text-center"
    >
      <TextWithGradient
        class="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-4"
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
/* Tailwind doesn't support gradient text directly, so we use @apply for the gradient */
.gradient-color {
  @apply bg-gradient-to-r from-[#f6ffe8] via-white to-[#eceee0] bg-clip-text text-transparent;
}
</style>
