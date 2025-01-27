<script setup>
import { defineProps } from "vue";
import CustomStory from "../core/CustomStory.vue";
import CustomSection from "../core/CustomSection.vue";
import CustomSectionBackground from "../core/CustomSectionBackground.vue";
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  direction:{
    type: String,
    validator(value) {
      return ["left", "right"].includes(value);
    } 
  },
  directionBG:{
    type: String,
    validator(value) {
      return ["top", "bottom"].includes(value);
    }},
});
</script>

<template>
 <CustomSectionBackground :direction="directionBG"> 
  <CustomSection>
      <CustomStory 
      :title="title"
      :image="image" 
      :description="description" 
      :direction="direction"
      :directionBG="directionBG"
      />
    </CustomSection>
</CustomSectionBackground>
</template>

