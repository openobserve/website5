<script setup lang="ts">
import CardWithShadowBorder from "../core/CardWithShadowBorder.vue";
import CustomSection from "../core/CustomSection.vue";

const props = defineProps<{
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
  <div class="bg-gray-50">
    <CustomSection>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CardWithShadowBorder v-for="(card, index) in props.data" :key="index" :title="card.title"
          :description="card.description" :icon="card.icon" :buttonText="card.buttonText" :buttonLink="card.buttonLink"
          :theme="card.theme" :items="card.items" />

      </div>
    </CustomSection>
  </div>
</template>