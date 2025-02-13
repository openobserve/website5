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
      <div v-if="heading">
        <Heading :title="heading?.title" :description="heading?.subtitle" />
      </div>
      <div class="flex justify-center w-full">
        <div
          class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-2 md:gap-6 mx-auto [&>*:nth-child(2)]:cols-start-2"
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
@media (max-width: 640px) {
  /* Tailwind's sm breakpoint */
  .grid {
    grid-template-columns: repeat(2, minmax(0, 1fr)); /* Two columns */
  }

  /* If the last child is alone in the row, center it */
  .grid > *:nth-child(odd):last-child {
    grid-column: span 2;
    justify-self: center;
  }
}
</style>
