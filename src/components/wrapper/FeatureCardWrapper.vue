<script setup>
import CustomSection from "../core/CustomSection.vue";
import CustomFeatureCard from "../cards/CustomFeatureCard.vue";
import Heading from "../core/Heading.vue";

const props = defineProps({
  heading: {
    type: Object,
    default: () => ({}),
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  noOfGridColumn: {
    type: Number,
    required: true,
    default: 4,
  },
  // New prop to select layout (flex or column)
  layout: {
    type: String,
    default: "row", // Default is 'row'
    validator: (value) => ["row", "column"].includes(value), // Only allow 'flex' or 'column'
  },
});
</script>

<template>
  <div class="">
    <div class="relative bg-cover bg-no-repeat overflow-visible">
      <!-- Background Images -->
      <img
        src="/Platform/FeatureCard-Ellipse-136.svg"
        alt="Image"
        class="absolute bottom-[-40vh] right-[105vh] opcacity-30 object-contain"
      />
      <img
        src="/Platform/FeatureCard-Ellipse-140.svg"
        alt="Image"
        class="absolute bottom-[-60vh] right-[80vh] object-contain opacity-70"
      />
      <img
        src="/Platform/Feature-Card-Ellipse-40.svg"
        alt="Image"
        class="absolute top-0 right-0 object-contain"
      />

      <!-- Main Content -->
      <CustomSection>
        <div class="md:mb-10 md-5">
          <Heading :title="heading.title" align="CENTER" />
        </div>
        <div
          :class="[
            `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${noOfGridColumn} gap-10 w-full`,
          ]"
        >
          <div
            class="flex gap-4"
            v-for="(item, index) in items"
            :key="index"
            :class="layout === 'column' ? 'flex-col justify-start' : 'flex-row'"
          >
            <CustomFeatureCard :card="item" />
          </div>
        </div>
      </CustomSection>
    </div>
  </div>
</template>

<style scoped>
/* Customize the image sizes and positions if needed */
img {
  z-index: -1; /* Ensure the images appear behind the content */
}
</style>
