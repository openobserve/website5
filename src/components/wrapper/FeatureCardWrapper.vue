<script setup>
import CustomSection from "../core/CustomSection.vue";
import CustomFeatureCard from "../cards/CustomFeatureCard.vue";
import Heading from "../core/Heading.vue";

const props = defineProps({
  items: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="relative py-10 bg-cover bg-no-repeat overflow-visible">
    <!-- Background Images -->
    <img
      src="/Platform/FeatureCard-Ellipse 136.svg"
      alt="Image"
      class="absolute bottom-[-30vh] right-[110vh] opcacity-30 object-contain"
    />
    <img
      src="/Platform/FeatureCard-Ellipse 140.svg"
      alt="Image"
      class="absolute bottom-[-60vh] right-[80vh] object-contain opacity-70"
    />
    <img
      src="/Platform/Feature Card Ellipse 40.svg"
      alt="Image"
      class="absolute top-0 right-0 object-contain"
    />

    <!-- Main Content -->
    <CustomSection>
      <Heading :title="props.items.title" align="CENTER" />
      <CustomFeatureCard
        class="py-10"
        :cards="props.items.items"
        layout="column"
        :columns="4"
      />
    </CustomSection>
  </div>
</template>

<style scoped>
/* Customize the image sizes and positions if needed */
img {
  z-index: -1; /* Ensure the images appear behind the content */
}
</style>
