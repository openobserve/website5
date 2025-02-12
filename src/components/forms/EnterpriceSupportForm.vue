<script setup>
import CustomSection from "../core/CustomSection.vue";
import Heading from "../core/Heading.vue";
import LeftSideSection from "./LeftSideSection.vue";
import RightSideSection from "./RightSideSection.vue";

const props = defineProps({
  heading: {
    type: Array,
    required: true,
  },
  subTitle: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="">
    <CustomSection
      class="bg-opacity-80 backdrop-blur-lg shadow-lg rounded-lg glass-card max-w-7xl mx-auto"
    >
      <!-- Title Section -->
      <Heading
        class="text-2xl md:text-3xl font-bold text-center text-white"
        :title="heading.title"
      />

      <div class="flex flex-col md:flex-row gap-8">
        <LeftSideSection
          :description="subTitle"
          :keyFeatures="items"
          :footerdescription="description"
        />
        <RightSideSection />
      </div>
    </CustomSection>
  </div>
</template>
<style scoped>
.glass-card {
  border-radius: 16px;
  border-top: 1px solid var(--Glass-stroke, #fff);
  background: linear-gradient(
    180deg,
    rgba(1, 1, 1, 0.48) 29.9%,
    rgba(1, 1, 1, 0.8) 100%
  );
}
</style>
