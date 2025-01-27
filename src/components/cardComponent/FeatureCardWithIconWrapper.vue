<script setup>
import { defineProps } from "vue";
import IconTitleCard from "./FeatureCardWithIcon.vue";
import CustomSection from "../core/CustomSection.vue";
import Heading from "../core/Heading.vue";
import CustomSectionBackground from "../core/CustomSectionBackground.vue";
const props = defineProps({
  cardData: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="relative bg-cover bg-no-repeat w-full overflow-visible">
    <img
      src="/cardBg1.svg"
      class="absolute bottom-[-60vh] right-[105vh] -z-10 object-contain"
      alt="Background SVG"
    />
    <img
      src="/cardBg2.svg"
      alt="Image"
      class="absolute bottom-[-6ovh] -z-10 object-contain"
    />
    <!-- <img
      src="/cardBg2.svg"
      class="absolute bottom-[-60vh] -z-10"
      alt="Background SVG"
    /> -->
    <CustomSection>
      <Heading
        :title="props.cardData?.title"
        :description="props.cardData?.description"
      />
      <div class="grid grid-col mt-10 w-full">
        <IconTitleCard :cards="props.cardData?.items" />
      </div>
    </CustomSection>
  </div>
</template>
