<script setup>
import CustomSection from "../core/CustomSection.vue";
import Heading from "../core/Heading.vue";
import LeftSideCard from "../../components/cardComponent/LeftSideCard.vue";
import RightSideCard from "../../components/cardComponent/RightSideCard.vue";
import CustomButton from "../core/CustomButton.vue";
import CustomImage from "../core/CustomImage.vue";

const props = defineProps({
//fetch card items form api here.
  // items: {
  //   type: Array,
  //   required: true,
  // },
 heading:{
  type:Object,
  required:true,
 },
  primaryButton: {
    type: Object,
    default: "",
  },
});
</script>

<template>
  <CustomSection>
    <Heading :title="props.title" :description="props.subtitle" align="CENTER" />
    
    <!-- Desktop View -->
    <div class="hidden md:block py-10 relative">
      <CustomImage src="/Platform/Ellipse-141.svg" alt="Image" cssClass="absolute opacity-30 object-contain" />
      
      <div class="flex flex-row gap-3 justify-center container mx-auto pt-3 h-full w-full">
        <div v-if="props.items.length > 0">
          <LeftSideCard :card="props.items[0]" />
        </div>
        <div class="flex flex-col gap-3 justify-center items-center h-full">
          <RightSideCard
            v-for="(card, index) in props.items.slice(1)"
            :key="index"
            :card="card"
          />
        </div>
      </div>
    </div>

    <!-- Mobile View -->
    <div class="block md:hidden">
      <div class="flex flex-col space-y-3">
        <LeftSideCard
          v-for="(card, index) in props.items"
          :key="index"
          :card="card"
        />
      </div>
    </div>

    <div class="flex justify-center">
      <CustomButton variant="secondary" size="medium" :buttonText="primaryButton.text" :buttonLink="primaryButton.link" />
    </div>
  </CustomSection>
</template>
