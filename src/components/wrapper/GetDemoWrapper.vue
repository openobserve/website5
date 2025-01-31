<script setup>
import Heading from "../core/Heading.vue";
import CustomButton from "../core/CustomButton.vue";
import CustomSection from "../core/CustomSection.vue";
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
 primaryButton:{
  type:Object,
  required:true,
 }
});
</script>
<template>
  <CustomSection>
  <div class="container mx-auto pb-20 ">
  <Heading :title="title" align="CENTER" />
  <div class="text-center pt-5">
    <CustomButton variant="secondary" size="medium" :buttonText="primaryButton.text" :buttonLink="primaryButton.link" />
  </div>
</div>
</CustomSection>
</template>
