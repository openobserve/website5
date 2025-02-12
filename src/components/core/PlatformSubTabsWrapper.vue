<script setup>
import CustomSection from "../core/CustomSection.vue";
import Heading from "../core/Heading.vue";
import CustomTabs from "../core/CustomTabs.vue";
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  heading: {
    type: Object,
    required: true,
  },
});
</script>
<template>
    <CustomSection>
  <div class="relative justify-center w-full">
    <!-- Background image with lower z-index -->
    <!-- <div class=""> -->
      <img
        alt="Bottom decoration"
        class="absolute w-screen h-1/4 md:h-auto rounded-2xl"
        src="/img/bg/platform/glass-bg.svg"
      />
    <!-- </div> -->

    <!-- Content with higher z-index -->
   
      <div class="relative w-full pt-6 px-3">
        <Heading
          :title="heading?.title"
          :description="heading?.subtitle"
          align="CENTER"
        />
        <CustomTabs class="pt-8 px-3" :items="items" client:load />
      </div>
  </div>
</CustomSection>
</template>
