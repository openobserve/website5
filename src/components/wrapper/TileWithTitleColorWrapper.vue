<script setup>
import { defineProps } from "vue";
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
});
</script>

<template>
  <div class="relative bg-cover bg-no-repeat w-full overflow-visible">
    <CustomSection>
      <Heading :title="title" :description="description" />
      <div class="grid grid-col w-full">
        <CustomTilesWithTitle :cards="items" />
      </div>
    </CustomSection>
  </div>
</template>
