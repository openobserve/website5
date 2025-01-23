<script setup>
import { defineProps } from "vue";
import IconTitleCard from "./FeatureCardWithIcon.vue";
import CustomSection from "../core/CustomSection.vue";
import Heading from "../core/Heading.vue";
import CustomSectionBackground from "../core/CustomSectionBackground.vue";
const props = defineProps({
  cardData: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <CustomSection>
    <div class="relative flex flex-col">
      <div 
        class="absolute -inset-x-48 -inset-y-24 -z-10"
        style="
          background-image: url('/bg-ellipse2-section.svg'), url('/bg-ellipse-section.svg');
          background-position: left -25rem top, right -12rem top;
          background-repeat: no-repeat, no-repeat;
          background-size: 150%, 150%;
        "
      ></div>
      <!-- <img 
  src="/bg-ellipse2-section.svg" 
  class="absolute -left-48 top-44 w-1/2 h-full" 
  alt="Background SVG"
/>
      <img 
  src="/bg-ellipse-section.svg" 
  class="absolute right-0 top-56 w-1/2 h-full" 
  alt="Background SVG"
/> -->

      <Heading :title="props.cardData.title" :description="props.cardData.description" />
      <div class="grid grid-col mt-10">
        <div>
          <div class="flex flex-col space-y-4 w-full h-full items-center justify-center">
            <!-- Pass the single card object to the child component -->
            <IconTitleCard :cards="props.cardData.items" />
          </div>
        </div>
      </div>
    </div>
  </CustomSection>
</template>
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
