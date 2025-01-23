<script setup>
const props = defineProps({
  cards: {
    type: Array,
    required: true,
  },
});
</script>
<template>
  <div class="container mx-auto py-8">
    <!-- Responsive Grid Container -->
    <div
      class="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-items-center"
    >
      <!-- Loop through card data -->
      <div
        v-for="(card, index) in cards"
        :key="index"
        class="w-full max-w-[214px] h-auto p-6 flex flex-col items-center rounded-lg border-[#3f454a] gap-4 bg-[rgba(255,255,255,0.1)]"
      >
        <!-- Icon -->
        <div class="rounded-full flex justify-center items-center mb-4">
          <img :src="card.icon" alt="icon" class="w-14 h-14" />
        </div>
        <!-- Title -->
        <h3 class="text-lg font-semibold text-[#BEC0C2] text-center">
          {{ card.title }}
        </h3>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
