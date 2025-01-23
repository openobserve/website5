<script setup>
import { defineProps, computed } from "vue";
import IconTitleCard from "./CardWithIcon.vue";

const props = defineProps({
  cards: {
    type: Array,
    required: true,
  },
});

const limitedCards = computed(() => props.cards.slice(0, 3));
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 container mx-auto pt-20">
    <div
      v-for="(card, index) in limitedCards"
      :key="index"
      :class="[
        'rounded-2xl w-full p-[1px] shadow-md bg-gradient-blue transition duration-300 hover:shadow-2xl cardShadow',
        {
          'lg:col-span-2': index === 0 || index === 1,
          'lg:col-span-3': index === 2
        }
      ]"
    >
      <div
        class="flex flex-col space-y-4 w-full h-full items-center justify-center rounded-2xl bg-[#23282c] p-8"
      >
        <IconTitleCard :card="card" />
      </div>
    </div>

    <!-- Static card -->
    <a
      href="/"
      class="rounded-2xl w-full p-[1px] shadow-md bg-gradient-blue transition duration-300 hover:shadow-2xl cardShadow lg:col-span-1 block"
    >
      <div
        class="flex flex-col space-y-4 w-full h-full items-center justify-center rounded-2xl bg-[#23282c] p-8"
      >
        <div class="w-16 h-16 overflow-hidden">
          <img src="CardSeeALLicon.svg" alt="View all use cases" class="w-full h-full object-cover" />
        </div>
        <h3 class="text-base font-semibold text-[#BEC0C2]">View all use cases</h3>
      </div>
    </a>
  </div>
</template>

<style scoped>
.cardShadow:hover {
  box-shadow: 0 0 60px 0 rgba(66, 174, 255, 0.8);
  border-radius: 1rem;
  transition: all;
}
</style>