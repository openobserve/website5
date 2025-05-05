<script setup lang="ts">
import CardWithShadowBorder from "../core/CardWithShadowBorder.vue";
import CustomSection from "../core/CustomSection.vue";
import HeadingSection from "../core/HeadingSection.vue";

const props = defineProps<{
  align: string; // Changed from strict union type to string
  title?: string;
  description?: string;
  items?: {
    title: string;
    description: string;
    image: {
      url: string;
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
  <div class="bg-gray-50">
    <CustomSection>
      <div class="mb-8">
        <HeadingSection :title="props.title" :description="props.description" align="center" />
      </div>
      <div class="card-grid">
        <CardWithShadowBorder v-for="(card, index) in props.data" :key="index" class="card-item" :title="card.title"
          :description="card.description" :icon="card.icon" :buttonText="card.buttonText" :buttonLink="card.buttonLink"
          :theme="card.theme" :items="card.items" :align="props.align" />
      </div>
      <div class="mt-8 space-y-10 text-center bg-white p-6 rounded-lg shadow-md">
        <h4 class="text-xl font-bold">{{ props.items?.title }}</h4>
        <img :src="props.items?.image?.url" alt="Image" class="w-full h-auto mb-4 object-cover" />
        <p class="max-w-3xl mx-auto">{{ props.items?.description }}</p>
      </div>
    </CustomSection>
  </div>
</template>

<style scoped>
:deep(.card-grid) {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

/* Optional: Ensure card has consistent size */
:deep(.card-item) {
  /* Optional: default full-width of cell */
}

/* Center last single item */
:deep(.card-item:last-child:nth-child(3n + 1)) {
  justify-self: center;
  grid-column: span 1;
}

/* Center two items in last row */
:deep(.card-item:nth-last-child(2):nth-child(3n + 1)),
:deep(.card-item:nth-last-child(1):nth-child(3n + 2)) {
  justify-self: center;
}

</style>