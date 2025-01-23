<script setup>
import Cards from "./Cards.vue";

const props = defineProps({
  cards: {
    type: Array,
    required: true,
  },
});
</script>
<template>
  <div class="container mx-auto p-4">
    <!-- Responsive Grid Container -->
    <div
      class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center w-3/4 mx-auto"
    >
      <!-- Loop through card data -->

      <Cards
        v-for="(card, index) in cards"
        :key="index"
        :index="index"
        :image="card.icon"
        :title="card.title"
        :description="card.description"
      />
    </div>
  </div>
</template>
