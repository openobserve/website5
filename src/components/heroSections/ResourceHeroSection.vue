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
    class="relative flex flex-col items-center justify-end text-center px-4 w-full min-h-[60vh] before:content-[''] before:absolute before:w-full before:min-h-[200vh] before:top-0 before:bg-no-repeat before:bg-[50%_-40vh] md:before:bg-[50%_-50vh] lg:before:bg-[50%_-20vh] xl:before:bg-[50%_-10vh] before:bg-[url('/resources/BG.svg')]"
  >
    <div class="z-10 container mx-auto max-w-4xl">
      <TextWithGradient
        class="text-center text-5xl py-5 sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold"
        :title="props.title"
        textGradientColor="gradient-color"
      />
      <Heading
        :description="props.subtitle"
        align="CENTER"
        class="text-base sm:text-lg md:text-xl lg:text-2xl"
      />
    </div>
  </section>
</template>

<style scoped>
/* Gradient Text Styling */
.gradient-color {
  background: linear-gradient(
    90deg,
    #fff3e5 21.63%,
    #c3d6ff 59.28%,
    #d8d8d8 91.35%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
