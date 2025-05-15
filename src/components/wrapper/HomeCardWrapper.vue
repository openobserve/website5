<script setup lang="ts">
import CardWithShadowBorder from "../core/CardWithShadowBorder.vue";
import CustomSection from "../core/CustomSection.vue";
import HeadingSection from "../core/HeadingSection.vue";

const props = defineProps<{
  align: string; // Changed from strict union type to string
  title?: string;
  description?: string;
  background?: boolean;
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
  <div :class="background ? 'bg-gray-50' : ''">
    <CustomSection class="!pb-10">
      <div class="" v-if="props.title || props.description">
        <HeadingSection :title="props.title" :description="props.description" align="center" />
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CardWithShadowBorder v-for="(card, index) in props.data" :key="index" :title="card.title"
          :description="card.description" :icon="card.icon" :buttonText="card.buttonText" :buttonLink="card.buttonLink"
          :theme="card.theme" :items="card.items" :align="props.align" />

      </div>
    </CustomSection>
  </div>
</template>
