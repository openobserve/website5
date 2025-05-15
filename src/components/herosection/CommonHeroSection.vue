<script setup lang="ts">
import CustomButton from "../core/CustomButton.vue";
import CustomSection from "../core/CustomSection.vue";

defineProps({
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
  primaryButton: {
    type: Object,
    required: false,
  },
});
</script>

<template>
  <div class="w-full hero-gradient">
    <CustomSection sectionclass="py-2 sm:py-6 md:py-6 lg:py-8 xl:py-10">
      <div
        class="max-w-full container mx-auto flex flex-col px-4 space-y-6"
        :class="{
          'items-start text-left': align === 'left',
          'items-center text-center': align === 'center',
          'items-end text-right': align === 'right',
        }"
      >
        <h1
          class="text-3xl sm:text-4xl xl:text-5xl/none font-bold tracking-tighter text-white"
        >
          {{ title }}
        </h1>
        <p class="text-white text-lg md:text-xl">
          {{ description }}
        </p>
        <!-- Button -->
        <div v-if="primaryButton && primaryButton.text && primaryButton.link">
          <CustomButton
            variant="secondary"
            size="medium"
            :buttonText="primaryButton.text"
            :buttonLink="primaryButton.link"
            :target="primaryButton.target"
            btn-class="bg-white text-indigo-500"
          />
        </div>
      </div>
    </CustomSection>
  </div>
</template>
