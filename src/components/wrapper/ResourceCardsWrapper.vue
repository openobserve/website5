<script setup>
import CustomSection from "../core/CustomSection.vue";
import CustomFeatureCard from "../cards/CustomFeatureCard.vue";
import Heading from "../core/Heading.vue";
import CustomSeprater from "../core/CustomSeprater.vue";
import CustomButton from "../core/CustomButton.vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  noOfGridColumn: {
    type: Number,
    required: true,
  },
  btnTitle: {
    type: String,
    default: "Read More",
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
      <div class="text-center">
        <CustomButton variant="pricing" class="mt-10">
          {{ btnTitle }}
        </CustomButton>
      </div>
    </div>
  </CustomSection>
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
