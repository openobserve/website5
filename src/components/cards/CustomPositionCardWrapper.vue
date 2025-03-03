<script setup>
import CustomSection from "../core/CustomSection.vue";
import Heading from "../core/Heading.vue";
import CustomPositionCard from "./CustomPositionCard.vue";
import CustomButton from "../core/CustomButton.vue";
import { defineProps } from "vue";
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  positionCards: {
    type: Array,
    required: true,
  },
  buttons: {
    type: Array, // Array of button objects [{ label: "Button Title", variant: "primary" }]
    required: true,
  },
});
</script>

<template>
  <CustomSection>
    <div
      class="relative bg-cover bg-no-repeat overflow-visible container mx-auto"
    >
      <!-- Main Content -->

      <Heading :title="title" align="CENTER" />
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-12">
        <div
          class="rounded-lg w-full p-0.5 shadow-md bg-gradient-gray text-start transition-all duration-300 hover:shadow-2xl cardShadow"
          v-for="(item, index) in positionCards"
          :key="index"
        >
          <CustomPositionCard :cards="item" />
        </div>
      </div>
      <div class="flex justify-center items-center pt-12">
        <CustomButton
          v-for="(button, index) in buttons"
          :key="index"
          :variant="button.variant"
        >
          {{ button.label }}
        </CustomButton>
      </div>
    </div>
  </CustomSection>
</template>
