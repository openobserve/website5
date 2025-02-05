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
            `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${noOfGridColumns}  gap-10 w-full mt-10`,
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
      </div>
    </CustomSection>
  </div>
</template>
