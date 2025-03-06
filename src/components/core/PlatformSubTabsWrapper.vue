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
  <div class="relative">
    <!-- For smaller screens, image is outside CustomSection -->
    <img alt="Bottom decoration" class="md:hidden absolute w-screen h-2/5 rounded-2xl"
      src="/img/bg/gradient-bg/glass-bg.svg" />

    <CustomSection>
      <div class="relative justify-center w-full">
        <!-- For md screens and up, image is inside CustomSection -->
        <img alt="Bottom decoration" class="hidden md:block absolute w-screen h-full "
          src="/img/bg/gradient-bg/glass-bg.svg" />

        <!-- Content -->
        <div class="relative w-full pt-2 md:pt-6 px-0 md:px-3">
          <Heading :title="heading?.title" :description="heading?.subtitle" align="CENTER" />
          <CustomTabs class="md:pt-6" :items="items" client:load />
        </div>
      </div>
    </CustomSection>
  </div>
</template>
