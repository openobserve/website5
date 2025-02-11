<script setup>
import { defineProps } from "vue";
import IconTitleCard from "./FeatureCardWithIcon.vue";
import CustomSection from "../core/CustomSection.vue";
import Heading from "../core/Heading.vue";

const props = defineProps({
  heading: {
    type: Object,
    default: () => ({}),
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div
    class="relative container mx-auto bg-cover bg-no-repeat w-full overflow-visible"
  >
    <img
      src="/cardBg1.svg"
      class="absolute top-[0%] left-[-20%] -z-10 object-cover"
      alt="Background SVG"
    />
    <img
      src="/cardBg2.svg"
      alt="Image"
      class="absolute bottom-[-60vh] -z-10 object-cover"
    />

    <CustomSection>
      <Heading :title="heading?.title" :description="heading?.subtitle" />

      <div
        class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-2 md:gap-6 mt-10 w-full"
      >
        <!-- Loop moved here -->
        <IconTitleCard
          v-for="(item, index) in data"
          :key="index"
          :card="item"
        />
      </div>
    </CustomSection>
  </div>
</template>
