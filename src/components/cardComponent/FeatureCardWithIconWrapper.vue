<script setup>
import { defineProps } from "vue";
import IconTitleCard from "./FeatureCardWithIcon.vue";
import CustomSection from "../core/CustomSection.vue";
import Heading from "../core/Heading.vue";
import CustomImage from "../core/CustomImage.vue";

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
  <div class="relative bg-cover bg-no-repeat w-full overflow-visible">
    <CustomImage
      src="/cardBg1.svg"
      cssClass="absolute bottom-[-60vh] right-[105vh] -z-10 object-contain"
      alt="Background SVG"
    />
    <CustomImage
      src="/cardBg2.svg"
      alt="Image"
      cssClass="absolute bottom-[-60vh] -z-10 object-contain"
    />

    <CustomSection>
      <Heading :title="heading?.title" :description="heading?.subtitle" />

      <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-2 md:gap-6 mt-10 w-full">
        <!-- Loop moved here -->
        <IconTitleCard
          v-for="(item, index) in data"
          :key="index"
          :card="item"
        />

        <!-- Static "Explore all features" card -->
        <div
          class="rounded-2xl w-full p-[0.0625rem] shadow-md bg-gradient-gray hover:bg-gradient-blue transition-all duration-300 hover:shadow-2xl cardShadow"
        >
          <a href="/">
            <div
              class="flex flex-col space-y-4 w-full h-full items-center justify-center rounded-2xl bg-[#23282c] p-8"
            >
              <div class="w-16 h-16 overflow-hidden">
                <CustomImage
                  src="CardSeeALLicon.svg"
                  alt="View all use cases"
                  cssClass="w-full h-full object-cover"
                />
              </div>
              <h3 class="text-[#BEC0C2] text-base font-semibold">
                Explore all features
              </h3>
            </div>
          </a>
        </div>
      </div>
    </CustomSection>
  </div>
</template>
