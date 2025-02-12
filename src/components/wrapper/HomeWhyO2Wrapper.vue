<script setup>
import CustomFeatureCard from "../cards/CustomFeatureCard.vue";
import CustomSection from "../core/CustomSection.vue";
import Heading from "../core/Heading.vue";
const props = defineProps({
  heading: {
    type: Object,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  noOfGridColumns: {
    type: Number,
    required: true,
  },
});
</script>
<template>
  <div class="">
    <CustomSection>
      <Heading
        :title="heading?.title"
        :description="heading?.subtitle"
        align="CENTER"
      />
      <div class="relative">
        <img
          src="/cardBg1.svg"
          class="absolute -left-80 -top-44 w-full xl:w-[50%]"
          alt="Background SVG"
        />

        <div
          :class="[
            `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${noOfGridColumns} gap-1 md:gap-10 w-full mt-4 md:mt-10`,
          ]"
        >
          <div
            v-for="(item, index) in items"
            :key="index"
          >
            <CustomFeatureCard :card="item" />
          </div>
        </div>
      </div>
    </CustomSection>
  </div>
</template>
