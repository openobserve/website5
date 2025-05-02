<script setup lang="ts">
import CustomButton from "../core/CustomButton.vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  align: {
    type: String as () => "left" | "center" | "right",
    default: "left",
  },
  buttonText: {
    type: String,
    required: false,
  },
  buttonLink: {
    type: String,
    required: false,
  },
});
</script>

<template>
  <div class="w-full bg-gradient-to-r from-[#6A76E3] to-[#45A4F3] py-10 px-5">
    <div
      class="max-w-full mx-auto flex flex-col container px-4"
      :class="{
        'items-start text-left': align === 'left',
        'items-center text-center': align === 'center',
        'items-end text-right': align === 'right',
      }"
    >
      <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
        {{ title }}
      </h1>
      <p class="text-white text-lg md:text-xl">
        {{ description }}
      </p>
      <!-- Button -->
      <div v-if="buttonText && buttonLink">
        <CustomButton
          variant="secondary"
          size="medium"
          :buttonText="buttonText"
          :buttonLink="buttonLink"
          btn-class="bg-white text-indigo-500 mt-6"
        />
      </div>
    </div>
  </div>
</template>
