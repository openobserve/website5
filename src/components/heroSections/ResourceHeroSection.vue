<script setup>
import TextWithGradient from "../header/TextWithGradient.vue";

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
    class="relative flex flex-col items-center justify-center text-center px-4 w-full pt-3 lg:pt-1 min-h-[8rem] lg:min-h-[16rem] before:content-[''] before:absolute before:w-full before:min-h-[30rem] md:before:min-h-[40rem] xxl:before:min-h-[89rem] xxl:before:-top-48 before:bg-no-repeat before:bg-center before:bg-cover before:bg-[url('/img/bg/gradient-bg/BG.svg')]">
    <div class="z-10 container mx-auto max-w-3xl px-4 md:px-6 lg:px-8">
      <TextWithGradient class="text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold" :title="title"
        textGradientColor="gradient-color" padding="pb-3 md:pb-5" />
      <p
        class="text-white mt-3 text-center text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed md:leading-loose">
        {{ description }}
      </p>
    </div>
  </section>
</template>

<style scoped>
/* Gradient Text Styling */
.gradient-color {
  background: linear-gradient(90deg,
      #fff3e5 21.63%,
      #c3d6ff 59.28%,
      #d8d8d8 91.35%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
