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
    <!-- <img
      src="/img/bg/gradient-bg/cardBg1.svg"
      class="absolute top-[0%] left-[-20%] -z-10 object-cover"
      alt="Background SVG"
    />
    <img
      src="/img/bg/gradient-bg/cardBg2.svg"
      alt="Image"
      class="absolute bottom-[-60vh] -z-10 object-cover"
    /> -->

    <CustomSection>
      <div v-if="heading">
        <Heading :title="heading?.title" :description="heading?.subtitle" />
      </div>
      <div class="flex justify-center w-full">
        <div
          class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-2 md:gap-6 mx-auto"
        >
          <!-- Loop moved here -->
          <IconTitleCard
            v-for="(item, index) in data"
            :key="index"
            :card="item"
          />
        </div>
      </div>
    </CustomSection>
  </div>
</template>
<style scoped>
/* Selects the 6th item and moves it to the second column */
.grid > *:nth-child(6) {
  grid-column-start: 2;
}
</style>
