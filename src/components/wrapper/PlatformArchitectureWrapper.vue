<script setup>
import { ref } from "vue";
import CustomSection from "../core/CustomSection.vue";
import HeadingSection from "../core/HeadingSection.vue";
import CardWithSideIcon from "../core/CardWithSideIcon.vue";
import CustomButton from "../core/CustomButton.vue";
import TabsHeader from "../core/TabsHeader.vue";
import MobileviewArchitectureSVG from "../core/MobileviewArchitectureSVG.vue";
import LaptopviewArchitectureSVG from "../core/LaptopviewArchitectureSVG.vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  btnValues: {
    type: String,
    required: false,
  },
  data: {
    type: Array,
    required: true,
  },
  background: {
    type: Boolean,
    required: false,
  },
});

</script>

<template>
  <div :class="background ? 'bg-gray-50' : ''">
    <CustomSection :section-class="`pb-0 sm:pb-0 lg:pb-0 xl:pb-0`">
      <div>
        <!-- Heading Section -->
        <HeadingSection :title="title" :description="description" align="center" />
        <div class="flex flex-col md:flex-row items-center justify-center w-full  h-full">
            <!-- desktop screen -->
            <LaptopviewArchitectureSVG
              class="mx-auto w-full lg:w-2/3 h-auto rounded-lg hidden md:block lg:ml-[132px]" />
            <!-- Mobile screen -->
            <MobileviewArchitectureSVG class="w-full h-full rounded-lg block md:hidden" />
          </div>
      </div>
    </CustomSection>
  </div>
</template>
