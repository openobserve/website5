<script setup>
import TextWithGradient from "../header/TextWithGradient.vue";
import { defineProps } from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
});
</script>

<template>
  <section
    class="relative flex flex-col items-center justify-center text-center px-4 w-full min-h-[30vh] sm:min-h-[40vh]"
  >
    <!-- Top Background -->
    <div
      class="absolute inset-0 bg-no-repeat bg-cover bg-top sm:bg-[50%_-20vh] md:bg-[50%_-10vh] xl:bg-[50%_-10vh]"
      style="
        background-image: url(&quot;/img/bg/gradient-bg/ContactUsTopbg.svg&quot;);
      "
    ></div>
    <div class="z-10 container mx-auto max-w-4xl absolute">
      <TextWithGradient
        class="text-center text-4xl py-3 md:text-5xl xl:text-7xl font-bold"
        :title="props.title"
        textGradientColor="gradient-color"
      />
      <div v-if="description">
        <h1 class="text-white text-base md:text-lg xl:text-xl mt-4">
          {{ description }}
        </h1>
      </div>
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
