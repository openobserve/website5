<script setup>
import CustomSection from "../core/CustomSection.vue";
import CustomFeatureCard from "../cards/CustomFeatureCard.vue";
import Heading from "../core/Heading.vue";
import CustomSeprater from "../core/CustomSeprater.vue";
import CustomButton from "../core/CustomButton.vue";

const props = defineProps({
  heading: {
    type: Object,
    required: false,
  },
  items: {
    type: Array,
    required: true,
  },
  noOfGridColumn: {
    type: Number,
    required: true,
    default: 3,
  },
  primaryButton: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="py-20">
    <CustomSection
      class="bg-opacity-80 backdrop-blur-lg shadow-lg rounded-lg glass-card"
    >
      <div>
        <!-- Main Content -->
        <div>
          <Heading :title="title" :description="subtitle" align="CENTER" />
        </div>
        <div
          :class="[
            `py-16 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-${noOfGridColumn} gap-10 w-full `,
          ]"
        >
          <div
            class="flex gap-4 md:flex-row flex-col justify-start"
            v-for="(item, index) in items"
            :key="index"
          >
            <CustomFeatureCard :card="item" borderColor="bg-white" />
          </div>
        </div>
        <div class="flex justify-center items-center text-center">
          <CustomButton
            variant="pricing"
            class="mt-10"
            :buttonLink="primaryButton?.link"
          >
            {{ primaryButton?.text }}
          </CustomButton>
        </div>
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
