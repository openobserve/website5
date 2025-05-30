<template>
  <CustomSection sectionClass="max-w-4xl !pt-10">
    <HeadingSection
      :title="title"
      :description="description"
      align="center"
      class="!mb-3c"
    />
    <div class="w-full flex flex-col gap-4 items-center h-full justify-center lg:px-12">
      <!-- Tabs Header -->
      <TabsHeader
        :tabs="tabs"
        :activeTab="activeTab"
        @update:activeTab="handleTabChange"
        gridClass="grid w-full justify-center grid-cols-2 gap-2"
        :key="activeTab"
      />
      <!-- Options Card -->
      <OptionsCard :tabs="tabData" v-model="activeTab" />
    </div>
  </CustomSection>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import HeadingSection from "../core/HeadingSection.vue";
import TabsHeader from "../core/TabsHeader.vue";
import OptionsCard from "./OptionsCard.vue";
import CustomSection from "../core/CustomSection.vue";
import { slugify } from "@/utils/slugify";

// Props definition
const props = defineProps<{
  title: string;
  description: string;
  buttons: Record<string, any>;
  cloudData: {
    title: string;
    items: any[];
  };
  selfHostedData: {
    title: string;
    items: any[];
  };
}>();

// Reactive tabs array
const tabs = computed(() => [
  { title: props.cloudData?.title, value: slugify(props.cloudData?.title || "cloud") },
  { title: props.selfHostedData?.title, value: slugify(props.selfHostedData?.title || "self-hosted") }
]);

// Active tab state
const activeTab = ref(tabs.value[0]?.value || "cloud");

// Computed tab data based on active tab
const tabData = computed(() => {
  if (activeTab.value === tabs.value[0].value) {
    return props.cloudData?.items || [];
  } else {
    return props.selfHostedData?.items || [];
  }
});

// Tab change handler
function handleTabChange(value: string) {
  activeTab.value = value;
}

// Debug: Watch for tab data updates
watch(tabData, (newVal) => {
  console.log("Tab Data updated:", newVal);
});
</script>

<style scoped></style>
