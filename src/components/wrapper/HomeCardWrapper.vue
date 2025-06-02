<script setup lang="ts">
import CardWithShadowBorder from "../core/CardWithShadowBorder.vue";
import CustomSection from "../core/CustomSection.vue";
import HeadingSection from "../core/HeadingSection.vue";

const props = defineProps<{
  align: string; // Changed from strict union type to string
  heading?: {
    title?: string;
    description?: string;
  };
  background?: boolean;
  items: Array<{
    title: string;
    description: string;
    image: Object;
    button?: {
      text?: string;
      link?: string;
      target?: string;
    };
    theme?: string;
    items?: string[];
  }>;
  headingLevel?: string;
}>();

</script>

<template>
  <div :class="background ? 'bg-gray-50' : ''">
    <CustomSection sectionClass="!py-10 lg:!py-12">
      <div class="" v-if="props?.heading?.title || props?.heading?.description">
        <HeadingSection :title="props?.heading?.title" :description="props?.heading?.description" align="center" />
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CardWithShadowBorder v-for="(card, index) in props.items" :key="index" :card="{ ...card, align }"
          :headingLevel="props.headingLevel" />
      </div>
    </CustomSection>
  </div>
</template>
