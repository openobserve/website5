<script setup>
import CustomSection from "../core/CustomSection.vue";
import CustomFeatureCard from "../cards/CustomFeatureCard.vue";
import Heading from "../core/Heading.vue";
import CustomCard from "./CustomCard.vue";
import CustomSeprater from "../core/CustomSeprater.vue";
import CustomButton from "../core/CustomButton.vue";
import { defineProps } from "vue";
const props = defineProps({
  heading:{
    type:Object,
    required:false,
  },
  items: {
    type: Array,
    required: true,
  },
 
  primaryButton: {
    type: Object,
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
        <Heading :title="heading?.title" :description="heading?.subtitle" align="LEFT" />
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-20">
          <div
            class="rounded-lg w-full p-0.5 shadow-md bg-gradient-blue text-start transition-all duration-300 hover:shadow-2xl cardShadow"
            v-for="(item, index) in items"
            :key="index"
          >
            <CustomCard :cards="item" />
          </div>
        </div>
       <div class="flex justify-center items-center pt-12">
        <CustomButton variant="primary" class="w-full sm:w-auto" :buttonLink="primaryButton.link">
          {{ primaryButton.text }}
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
