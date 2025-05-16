<template>
  <CustomSection sectionClass="max-w-4xl !pb-0 !pt-14">
    <HeadingSection
      :title="title"
      :description="description"
      align="center"
      class="!mb-10"
    />
    <div
      class="w-full flex flex-col gap-4 items-center h-full justify-center mt-6 lg:px-12"
    >
      <!-- <TabsHeader
        :tabs="tabs"
        :activeTab="activeTab"
        @update:activeTab="activeTab = $event"
        gridClass="grid w-full justify-center grid-cols-2 gap-2"
      />
      <OptionsCard :tabs="tabs" :activeTab="activeTab" /> -->
      <!-- Main Tabs -->
      <TabsHeader
        :tabs="tabs"
        :activeTab="activeTab"
        @update:activeTab="activeTab = $event"
        gridClass="grid w-full justify-center grid-cols-2 gap-2"
      />
      <OptionsCard :tabs="tabs" :activeTab="activeTab" />
    </div>
  </CustomSection>
</template>
<script setup lang="ts">
import HeadingSection from "../core/HeadingSection.vue";
import TabsHeader from "../core/TabsHeader.vue";
import OptionsCard from "./OptionsCard.vue";
import CustomSection from "../core/CustomSection.vue";
import { computed, ref, watch } from "vue";
const props = defineProps<{
  title: {
    type: String;
    required: true;
  };
  description: {
    type: String;
    required: true;
  };
  buttons: {
    type: Object;
    required: true;
  };
  tabs: {
    type: Array;
    required: true;
  };
}>();
const activeTab = ref(props.tabs[0]?.value || "");

// Watch for change in main tab to reset subtab
watch(() => activeTab.value, { immediate: true });
</script>
<style scoped></style>
