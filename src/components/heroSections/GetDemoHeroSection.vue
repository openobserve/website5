<script setup>
import { string } from "astro:schema";
import TextWithGradient from "../../components/HeaderComponents/TextWithGradient.vue";
import { defineProps } from "vue";
const props = defineProps({
  title: {
    type: string,
    required: true,
  },
});
</script>
<template>
  <section
    class="relative flex flex-col items-center justify-center text-center px-4 w-full min-h-[40vh] before:content-[''] before:absolute before:w-full before:min-h-[160vh] before:top-0 before:bg-no-repeat before:bg-[50%_-50vh] xl:before:bg-[50%_-30vh] before:bg-[url('/demoPage/Eclipse.svg')]"
  >
    <div class="z-10 container mx-auto max-w-4xl">
      <TextWithGradient
        class="text-center text-4xl py-5 md:text-5xl xl:text-7xl font-bold"
        :title="props.title"
        textGradientColor="gradient-color"
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
    #a6cab8 59.28%,
    #d8d8d8 91.35%
  );

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
