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
