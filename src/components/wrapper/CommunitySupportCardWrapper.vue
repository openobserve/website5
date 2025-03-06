<script setup>
import { defineProps } from "vue";
import CommunitySupportCard from "../cards/CommunitySupportCard.vue";
import CustomSection from "../core/CustomSection.vue";
import Heading from "../core/Heading.vue";

const props = defineProps({
  heading: {
    type: Object,
    required: false,
  },
  items: {
    type: Array,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
});
</script>

<template>
  <CustomSection>
    <div class="flex flex-col w-full container mx-auto space-y-14">
      <Heading
        :title="props.heading?.title"
        :description="props.heading?.subtitle"
      />
      <div class="mt-10 w-full">
        <CommunitySupportCard :cards="props?.items" />
      </div>
      <Heading :description="props?.description" />
    </div>
    <!-- <CustomSeprater /> -->
  </CustomSection>
</template>
