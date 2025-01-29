<script setup>
import CustomSection from "../core/CustomSection.vue";
import CustomFeatureCard from "../cards/CustomFeatureCard.vue";
import Heading from "../core/Heading.vue";
import CustomCard from "./CustomCard.vue";
import CustomSeprater from "../core/CustomSeprater.vue";
import CustomButton from "../core/CustomButton.vue";
import { defineProps } from "vue";
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  featureCards: {
    type: Array,
    required: true,
  },
  buttons: {
    type: Array, // Array of button objects [{ label: "Button Title", variant: "primary" }]
    required: true,
  },
});

console.log(props.featureCards, "Dattataa");
</script>

<template>
  <div class="">
    <div class="relative py-10 bg-cover bg-no-repeat overflow-visible container mx-auto">
      <!-- Main Content -->
      <CustomSection>
        <Heading :title="title" :description="description" align="LEFT" />
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-20">
          <div
            class="rounded-lg w-full p-0.5 shadow-md bg-gradient-blue text-start transition-all duration-300 hover:shadow-2xl cardShadow"
            v-for="(item, index) in featureCards"
            :key="index"
          >
            <CustomCard :cards="item" />
          </div>
        </div>
       <div class="flex justify-center items-center pt-12">
        <CustomButton
          v-for="(button, index) in buttons"
          :key="index"
          :variant="button.variant"
          class=""
        >
          {{ button.label }}
        </CustomButton>
      </div>
      </CustomSection>
    </div>
    <CustomSeprater />
  </div>
</template>

<style scoped>
/* Customize the image sizes and positions if needed */
img {
  z-index: -1;
  /* Ensure the images appear behind the content */
}
</style>
