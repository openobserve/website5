<template>
  <CustomSection >
  <div class="max-w-4xl mx-auto lg:px-0 px-4">
    <HeadingSection
      :title="title"
      :description="description"
      align="center"
      v-if="title || description"
    />
    <TabsHeader
        :tabs="tabs"
        :activeTab="activeTab"
        @update:activeTab="activeTab = $event"
        gridClass="grid w-full justify-center grid-cols-2 gap-2"
      />
      <PricingCards :tabs="tabs" :activeTab="activeTab" />
  </div>
  </CustomSection>
</template>
<script setup lang="ts">
import { computed, ref, watch } from "vue";
import HeadingSection from "../core/HeadingSection.vue";
import TabsHeader from "../core/TabsHeader.vue";
import PricingCards from "./PricingCards.vue";
import CustomSection from "../core/CustomSection.vue";
const props = defineProps<{
  title: {
    type: String;
    optional: true;
  };
  description: {
    type: String;
    optional: true;
  };
  tabs: {
    type: Array;
    required: true;
  };
}>();
const activeTab = ref(props.tabs[0]?.value || "");
</script>
<style scoped></style>
