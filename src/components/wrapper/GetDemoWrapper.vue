<script setup>
import Heading from "../core/Heading.vue";
import CustomButton from "../core/CustomButton.vue";
import CustomSection from "../core/CustomSection.vue";
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  primaryButton: {
    type: Object,
    required: true,
  },
});
</script>
<template>
  <div class="container mx-auto pb-16 px-20">
    <Heading :title="title" align="CENTER" />
    <div class="flex justify-center text-center pt-5" v-if="primaryButton">
      <CustomButton
        variant="secondary"
        size="medium"
        :buttonText="primaryButton.text"
        :buttonLink="primaryButton.link"
      />
    </div>
  </div>
</template>
