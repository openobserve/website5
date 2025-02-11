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

</script>

<template>
  <div class="">
    <div class="relative pt-10 bg-cover bg-no-repeat overflow-visible container mx-auto">
      <!-- Main Content -->
      <CustomSection>
        <Heading :title="heading?.title" :description="heading?.subtitle" align="CENTER" />
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-5 md:pt-20">
          <div
            v-for="(item, index) in items"
            :key="index"
          >
            <CustomCard :cards="item" />
          </div>
        </div>
       <div class="flex justify-center items-center pt-12" v-if="primaryButton.text && primaryButton.link">
        <CustomButton variant="secondary" class="w-full sm:w-auto" :buttonText="primaryButton.text" :buttonLink="primaryButton.link" />
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
