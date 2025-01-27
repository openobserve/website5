<script setup>
import { defineProps } from "vue";
import CustomTiles from "../cards/CustomTiles.vue";
import CustomSection from "../core/CustomSection.vue";
import Heading from "../core/Heading.vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  items: {
    type: Object,
    required: true,
  },
});
</script>
<template>
  <CustomSection>
    <Heading :title="title" align="CENTER" />
    <div class="pt-10">
      <CustomTiles :cards="items" />
    </div>
  </CustomSection>
</template>
