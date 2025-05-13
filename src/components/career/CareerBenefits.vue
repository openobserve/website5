<template>
  <div class="py-8">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
      <div v-for="(benefit, index) in benefits" :key="index" class="rounded-lg border">
        <Cards :title="benefit.title" :description="benefit.description" :icon="benefit.icon" :theme="benefit.iconColor"
          align="center" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Cards from "../core/Cards.vue";
interface Benefit {
  title: string;
  description: string;
  icon: string;
  iconColor: string;
}

const props = defineProps<{
  benefits: Benefit[];
}>();
</script>