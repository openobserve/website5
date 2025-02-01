<script setup>
import { defineProps, computed } from "vue";
import CustomSection from "../core/CustomSection.vue";
import Heading from "../core/Heading.vue";
import CustomTilesWithTitle from "../cards/CustomTilesWithTitle.vue";
import CustomSeprater from "../core/CustomSeprater.vue";
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
      }
    : {}
);
</script>

<template>
  <div class="relative">
    <div
      class="bg-contain bg-center bg-no-repeat w-full overflow-visible"
      :style="backgroundStyle"
    >
      <CustomSection>
        <Heading :title="title" :description="subtitle" />
        <div class="grid grid-col w-full py-20">
          <CustomTilesWithTitle :cards="items" />
        </div>
      </CustomSection>
      <CustomSeprater />
    </div>
  </div>
</template>
