<script setup lang="ts">
import CustomButton from "../core/CustomButton.vue";
import CustomImage from "../core/CustomImage.vue";
import CustomSection from "../core/CustomSection.vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: Object,
    required: true,
  },
  primaryButton: {
    type: Object,
    required: true,
  }
});
</script>

<template>
  <div class="w-full hero-gradient">
    <CustomSection>
      <div class="flex flex-col lg:flex-row items-center gap-6">
        <div
          class="w-full flex-1 lg:w-1/2 mx-auto flex flex-col items-center lg:items-start text-center lg:text-left space-y-5">          
          <h1 class="text-3xl lg:text-5xl font-bold text-white">
            {{ title }}
          </h1>
          <p class="text-white text-base md:text-xl">
            {{ description }}
          </p>
          <!-- Button -->
          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <CustomButton :variant="primaryButton.variant" size="medium" :buttonText="primaryButton.text"
              :buttonLink="primaryButton.link" />
          </div>
        </div>
        <div class="w-full lg:w-1/2 h-full">
          <CustomImage :image="image?.url" :altText="image?.altText" cssClass="rounded-lg" />
        </div>
      </div>
    </CustomSection>
  </div>
</template>