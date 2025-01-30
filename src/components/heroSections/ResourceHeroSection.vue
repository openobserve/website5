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
    class="relative flex flex-col items-center justify-end text-center px-4 w-full min-h-[70vh] before:content-[''] before:absolute before:w-full before:min-h-[200vh] before:top-0 before:bg-no-repeat before:bg-[50%_0vh] before:bg-[url('/resources/Hero-Section-Eclipse.svg'),_url('/resources/Hero-Section-Eclipse_(1).svg')]"
  >
    <div class="z-10 container mx-auto">
      <TextWithGradient
        class="text-center text-5xl py-5 sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold"
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
    #fff3e5 21.63%,
    #c3d6ff 59.28%,
    #d8d8d8 91.35%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
