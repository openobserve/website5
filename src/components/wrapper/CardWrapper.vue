<script setup>
import CustomSection from "../core/CustomSection.vue";
import HeadingSection from "../core/HeadingSection.vue";
import CardWithShadowBorder from "../core/CardWithShadowBorder.vue";
import CardWithSideIcon from "../core/CardWithSideIcon.vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  items: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div class="bg-gray-50">
  <CustomSection>
    <div>
      <!-- Heading Section -->
      <HeadingSection :title="title" :description="description" align="center" />

      <!-- Cards Section -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        <!-- CardWithShadowBorder -->
        <CardWithShadowBorder v-for="(card, index) in items" :key="index" :title="card.title"
          :description="card.description" :icon="card.icon" :buttonText="card.buttonText" :buttonLink="card.buttonLink"
          :theme="card.theme" :items="card.items" />

        <!-- CardWithSideIcon -->
        <!-- <CardWithSideIcon v-for="(card, index) in cardsData2" :key="index" :title="card.title"
          :description="card.description" :icon="card.icon" :theme="card.theme" :items="card.items" /> -->
      </div>
    </div>
  </CustomSection>
</div>
</template>