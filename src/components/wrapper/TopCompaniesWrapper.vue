<script setup>
import { defineProps } from "vue";
import CustomTile from "../cards/CustomTiles.vue";
import CustomSection from "../core/CustomSection.vue";
import Heading from "../core/Heading.vue";

const props = defineProps({
  heading: {
    type: Object,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <CustomSection>
    <Heading :title="heading?.title" align="CENTER" />
    <div
      class="pt-3 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center"
    >
      <CustomTile
        v-for="(card, index) in items"
        :key="index"
        :card="card"
        :index="index"
      />
    </div>
  </CustomSection>
</template>
