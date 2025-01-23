<script setup>
import { defineProps , computed } from "vue";
import IconTitleCard from "./CardWithIcon.vue";

const props = defineProps({
  cards: {
    type: Array,
    required: true,
  },
  textOnHover:{
    type: String,
  }
});

const visibleCards = computed(() => props.cards.slice(0, 9));
</script>

<template>
  <div class="grid grid-cols-5 gap-6 container mx-auto">
    <div
       v-for="(card, index) in visibleCards"
      :key="index"
      class=" rounded-2xl w-full p-[1px] shadow-md bg-gradient-gray hover:bg-gradient-blue transition-all duration-300 hover:shadow-2xl cardShadow"
    >
      <div
        class="flex flex-col space-y-4 w-full h-full items-center justify-center rounded-2xl bg-[#23282c] p-8"
      >
        <!-- Pass the single card object to the child component -->
        <IconTitleCard :card="card" textColorOnHover="text-[#80B9FF]"/>
      </div>
    </div>

    <!-- static card -->
    <div
      class="rounded-2xl w-full p-[1px] shadow-md bg-gradient-gray hover:bg-gradient-blue transition duration-300 hover:shadow-2xl cardShadow"
    >
      <div
        class="flex flex-col space-y-4 w-full h-full items-center justify-center rounded-2xl bg-[#23282c] p-8"
      >
      <div class="w-16 h-16 overflow-hidden">
          <img src="CardSeeALLicon.svg" alt="View all use cases" class="w-full h-full object-cover" />
        </div>
        <h3 class="text-base font-semibold text-[#BEC0C2] hover:text-[#80B9FF]">View all use cases</h3>
      </div>
    </div>
    <!-- static card -->
  </div>
</template>

<style scoped>
.cardShadow:hover {
  box-shadow: 0 0 60px 0 rgba(66, 174, 255, 0.8); /* Shadow effect */
  border-radius: 1rem;
  transition:all;
}
</style>
