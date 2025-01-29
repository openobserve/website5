<script setup>
import { defineProps, computed } from "vue";
import CustomSection from "../core/CustomSection.vue";
import Heading from "../core/Heading.vue";
import CustomTilesWithTitle from "../cards/CustomTilesWithTitle.vue";

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
  backgroundImage: {
    type: String,
    required: false, // Optional prop
    default: "", // Default to empty if no image is provided
  },
});

// Compute the dynamic background style
const backgroundStyle = computed(() =>
  props.backgroundImage
    ? {
        backgroundImage: `url('${props.backgroundImage}')`,
        backgroundPosition: "center",
        backgroundSize: "cover", // Ensures the image covers the full div
        backgroundRepeat: "no-repeat",
      }
    : {}
);
</script>

<template>
  <div
    class="relative bg-cover bg-no-repeat w-full overflow-visible"
    :style="backgroundStyle"
  >
    <CustomSection>
      <Heading :title="title" :description="subtitle" />
      <div class="grid grid-col w-full">
        <CustomTilesWithTitle :cards="items" />
      </div>
    </CustomSection>
  </div>
</template>
