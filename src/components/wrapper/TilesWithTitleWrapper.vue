<script setup>
import CustomSection from "../core/CustomSection.vue";
import Heading from "../core/Heading.vue";
import CustomTilesWithTitle from "../cards/CustomTilesWithTitle.vue";
import CustomImage from "../core/CustomImage.vue";
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div class="relative bg-cover bg-no-repeat w-full overflow-visible">
    <CustomImage
      image="/img/bg/gradient-bg/cardBg1.svg"
      cssClass="absolute bottom-[-60vh] right-[105vh] -z-10 object-contain"
      altText="Background SVG"
    />
    <CustomImage
      image="/img/bg/gradient-bg/cardBg2.svg"
      altText="Image"
      cssClass="absolute bottom-[-6ovh] -z-10 object-contain"
    />
    <!-- <CustomImage
      image="/cardBg2.svg"
      cssClass="absolute bottom-[-60vh] -z-10"
      altText="Background SVG"
    /> -->
    <CustomSection>
      <Heading :title="title" :description="description" />
      <div class="grid grid-col w-full">
        <CustomTilesWithTitle :cards="items" />
      </div>
    </CustomSection>
  </div>
</template>
