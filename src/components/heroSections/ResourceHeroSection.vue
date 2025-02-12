<script setup>
import Heading from "../core/Heading.vue";
import TextWithGradient from "../HeaderComponents/TextWithGradient.vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <section
    class="relative flex flex-col items-center justify-end text-center px-4 w-full min-h-[40vh] before:content-[''] before:absolute before:w-full before:min-h-[160vh] before:top-0 before:bg-no-repeat before:bg-[50%_-50vh] xl:before:bg-[50%_-30vh] before:bg-[url('/resources/BG.svg')]"
  >
    <div class="z-10 container mx-auto max-w-4xl">
      <TextWithGradient
        class="text-center text-5xl lg:text-9xl font-bold pt-[5vh] md:pt-[12vh]"
        :title="props.title"
        textGradientColor="gradient-color"
        padding="pb-10"
      />
      <Heading
        :description="props.description"
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
