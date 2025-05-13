<script setup lang="ts">
import CardWithShadowBorder from "../core/CardWithShadowBorder.vue";
import CustomSection from "../core/CustomSection.vue";
import HeadingSection from "../core/HeadingSection.vue";

const props = defineProps<{
  align: string; // Changed from strict union type to string
  title?: string;
  description?: string;
  background?: boolean;
  items?: {
    title: string;
    description: string;
    image: {
      url: string;
      alt: string;
      width?: number;
      height?: number;
    };
  };
  data: Array<{
    title: string;
    description: string;
    icon: string;
    buttonText?: string;
    buttonLink?: string;
    theme?: string;
    items?: string[];
  }>;
}>();
</script>

<template>
  <div :class="props.background ? 'bg-gray-50' : ''">
    <CustomSection>
      <div class="mb-8">
        <HeadingSection
          :title="props.title"
          :description="props.description"
          align="center"
        />
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CardWithShadowBorder
          v-for="(card, index) in props.data"
          :key="index"
          :title="card.title"
          :description="card.description"
          :icon="card.icon"
          :buttonText="card.buttonText"
          :buttonLink="card.buttonLink"
          :theme="card.theme"
          :items="card.items"
          :align="props.align"
        />
      </div>
      <div
        class="mt-8 space-y-10 text-center bg-white p-6 rounded-lg shadow-md"
      >
        <h3 class="text-xl font-bold">{{ props.items?.title }}</h3>
        <img
          :src="props.items?.image?.url"
          :alt="props.items?.image?.alt"
          class="object-cover flex justify-center mx-auto"
          :width="props.items?.image?.width || 'auto'"
          :height="props.items?.image?.height || 'auto'"
          loading="lazy"
          decoding="async"
        />
        <p class="max-w-3xl mx-auto">{{ props.items?.description }}</p>
      </div>
    </CustomSection>
  </div>
</template>
