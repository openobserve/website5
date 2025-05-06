<template>
  <div class="px-4 py-4 md:py-6 lg:py-6 xl:py-6" :class="background ? 'bg-gray-50' : ''">
    <div class="max-w-6xl mx-auto">
      <h2  v-if="title" class="text-2xl md:text-3xl font-bold text-center mb-2">{{ title }}</h2>
      <p   v-if="description" class="text-center text-gray-600 mb-12 max-w-3xl mx-auto">{{ description }}</p>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="(feature, index) in features" :key="index" class="text-center">
          <Cards :title="feature.title" :description="feature.description" :icon="feature.icon"
            :theme="feature.iconColor" align="center" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Cards from "../core/Cards.vue";
import CustomSection from "../core/CustomSection.vue";
interface GlobalTeamFeature {
  title: string;
  description: string;
  icon: string;
  iconColor: string;
}
defineProps<{
  title: string;
  description: string;
  background: boolean;
  features: GlobalTeamFeature[];
}>();
</script>