<script setup>
import CustomSection from "../core/CustomSection.vue";
import HeadingSection from "../core/HeadingSection.vue";
import CardWithBackground from "../core/CardWithBackground.vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  align: {
    type: String,
    default: "left",
  },
  data: {
    type: Array,
    required: true,
  },
  background:{
    type: Boolean,
    required: false,
  }
});
</script>

<template>
   <div :class="background ? 'bg-gray-50' : ''">
  <CustomSection>
    <div class="">
      <HeadingSection :title="title" :description="description" align="center" />
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <CardWithBackground v-for="(card, index) in data" :key="index" :title="card.title" :description="card.description"
        :icon="card.icon" :buttonText="card.buttonText" :buttonLink="card.buttonLink" :theme="card.theme"
        :items="card.items" :align="align" />
    </div>
  </CustomSection>
</div>
</template>