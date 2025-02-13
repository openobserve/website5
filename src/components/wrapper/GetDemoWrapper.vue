<script setup>
import Heading from "../core/Heading.vue";
import CustomButton from "../core/CustomButton.vue";
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
  <div class="container mx-auto">
  <div class="px-2 md:px-0">
    <Heading :title="title" align="CENTER" />
  </div>
    <div class="flex justify-center text-center py-5" v-if="primaryButton">
      <CustomButton
        variant="secondary"
        size="medium"
        :buttonText="primaryButton.text"
        :buttonLink="primaryButton.link"
      />
    </div>
  </div>
</template>
